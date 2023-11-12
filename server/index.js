const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require("./db/calinao.db");
const bcrypt = require("bcrypt");
const multer = require("multer");

// middleware
app.use(cors());
app.use(express.json()); //req.body

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../src/assets/foods/"); // Define the destination folder
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, Date.now() + "-" + file.fieldname + "." + ext); // Define the file name
    },
});

const upload = multer({ storage: storage });

// ROUTES //
app.get("/employees", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employee_table");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// POST a new employee
app.post("/employees", async (req, res) => {
    const {
        admin_id,
        admin_fname,
        admin_lname,
        admin_email,
        admin_password,
        role_id,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(admin_password, salt);

    try {
        const result = await pool.query(
            "INSERT INTO employee_table VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                admin_id,
                admin_fname,
                admin_lname,
                admin_email,
                bcryptPassword,
                role_id,
            ]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/staff", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM staff_table");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/staff", async (req, res) => {
    const {
        staff_id,
        staff_fname,
        staff_lname,
        staff_email,
        staff_password,
        role_id,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(staff_password, salt);

    const query = `
      INSERT INTO staff_table (staff_id, staff_fname, staff_lname, staff_email, staff_password, role_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    try {
        const result = await pool.query(query, [
            staff_id,
            staff_fname,
            staff_lname,
            staff_email,
            hashedPassword,
            role_id,
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/register", async (req, res) => {
    const {
        client_fname,
        client_lname,
        client_email,
        client_contact,
        client_street,
        client_barangay,
        client_city,
        client_password,
        role_id,
    } = req.body;

    try {
        // Check if email or contact is already in use
        const existingClient = await pool.query(
            "SELECT * FROM client_table WHERE client_email = $1 OR client_contact = $2",
            [client_email, client_contact]
        );

        if (existingClient.rows.length > 0) {
            return res
                .status(400)
                .json({ error: "Email or contact already in use" });
        }

        // Generate a unique client_id (you may need a more sophisticated approach)
        let client_id;
        let existingId;

        do {
            client_id = generateClientId();
            existingId = await pool.query(
                "SELECT * FROM client_table WHERE client_id = $1",
                [client_id]
            );
        } while (existingId.rows.length > 0);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(client_password, salt);

        // Insert new client
        const result = await pool.query(
            "INSERT INTO client_table (client_id, client_fname, client_lname, client_email, client_contact, client_street, client_barangay, client_city, client_password, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [
                client_id,
                client_fname,
                client_lname,
                client_email,
                client_contact,
                client_street,
                client_barangay,
                client_city,
                hashedPassword,
                role_id,
            ]
        );

        const newClient = result.rows[0];
        res.json({ user: newClient });
    } catch (error) {
        console.error("Error registering client", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});

app.patch("/client/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            client_fname,
            client_lname,
            client_email,
            client_contact,
            client_street,
            client_barangay,
            client_city,
        } = req.body;

        console.log(req.body);

        const query = `
            UPDATE client_table
            SET client_fname = $1, client_lname = $2, client_email = $3, client_contact = $4, client_street = $5, client_barangay = $6, client_city = $7
            WHERE client_id = $8
            RETURNING *;
        `;

        const result = await pool.query(query, [
            client_fname,
            client_lname,
            client_email,
            client_contact,
            client_street,
            client_barangay,
            client_city,
            id,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

function generateClientId() {
    // Generate a unique client_id (you may need a more sophisticated approach)
    return "CL_" + Math.random().toString(36).substr(2, 9);
}

app.post("/login", async (req, res) => {
    const { client_email, client_password } = req.body;

    try {
        const existingClient = await pool.query(
            "SELECT * FROM client_table WHERE client_email = $1 OR client_contact = $1",
            [client_email]
        );

        if (existingClient.rows.length !== 0) {
            const client = existingClient.rows[0];
            const isPasswordCorrect = await bcrypt.compare(
                client_password,
                client.client_password
            );

            if (isPasswordCorrect) {
                res.json(client);
            } else {
                res.status(401).json({ error: "Invalid password" });
            }
        } else {
            const existingAdmin = await pool.query(
                "SELECT * FROM employee_table WHERE admin_email = $1",
                [client_email]
            );

            if (existingAdmin.rows.length !== 0) {
                const admin = existingAdmin.rows[0];
                const isPasswordCorrect = await bcrypt.compare(
                    client_password,
                    admin.admin_password
                );

                if (isPasswordCorrect) {
                    res.json(admin);
                } else {
                    res.status(401).json({ error: "Invalid password" });
                }
            } else {
                const existingStaff = await pool.query(
                    "SELECT * FROM staff_table WHERE staff_email = $1",
                    [client_email]
                );

                if (existingStaff.rows.length !== 0) {
                    const staff = existingStaff.rows[0];
                    const isPasswordCorrect = await bcrypt.compare(
                        client_password,
                        staff.staff_password
                    );

                    if (isPasswordCorrect) {
                        res.json(staff);
                    } else {
                        res.status(401).json({ error: "Invalid password" });
                    }
                } else {
                    res.status(401).json({ error: "User does not exist" });
                }
            }
        }
    } catch (error) {
        console.error("Error logging in client", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});

//http://localhost:7723/clients
app.get("/clients", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM client_table");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//http://localhost:7723/menu
app.get("/foods", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM food_table");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// get from rreservation_food_table
app.get("/reservation_food/:reservation_id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM reservation_food_table WHERE reservation_id = $1",
            [req.params.reservation_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/foods", upload.single("food_image"), async (req, res) => {
    try {
        let id = "FD_" + Math.random().toString(36).substr(2, 9); // Generate a unique food_id (you may need a more sophisticated approach)

        console.log(req.body, "asd");
        console.log(req.file, "asd");

        const { food_name, food_type, food_price, food_description } = req.body;
        const food_image = "../src/assets/foods/" + req.file.filename;

        const query = `
          INSERT INTO food_table (food_id, food_name, food_type, food_price, food_description, food_image)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;

        const result = await pool.query(query, [
            id,
            food_name,
            food_type,
            food_price,
            food_description,
            food_image,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.patch("/foods/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { food_name, food_type, food_price, food_description } = req.body;

        const query = `
          UPDATE food_table
          SET food_name = $1, food_type = $2, food_price = $3, food_description = $4
          WHERE food_id = $5
          RETURNING *;
        `;

        const result = await pool.query(query, [
            food_name,
            food_type,
            food_price,
            food_description,
            id,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//get customer info via post
app.post("/client", async (req, res) => {
    try {
        const { client_id } = req.body;
        const result = await pool.query(
            "SELECT * FROM client_table WHERE client_id = $1",
            [client_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//add event
app.post("/events", async (req, res) => {
    try {
        //event_id varchar (25) //PK
        // event_name varchar (50)
        // event_type varchar (50)
        // event_date date
        // event_time time
        // event_venue varchar (50)
        // event_venue_final varchar (50)
        // event_theme varchar (50)
        // event_motif varchar (50)
        // event_guests int

        let id = "EV_" + Math.random().toString(36).substr(2, 9); // Generate a unique event_id (you may need a more sophisticated approach)

        const {
            event_name,
            event_type,
            event_date,
            event_time,
            event_venue,
            event_venue_final,
            event_theme,
            event_motif,
            event_guests,
        } = req.body;

        console.log(req.body);

        const query = `
          INSERT INTO event_table (event_id, event_name, event_type, event_date, event_time, event_venue, event_venue_final, event_theme, event_motif, event_guests)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *;
        `;

        const result = await pool.query(query, [
            id,
            event_name,
            event_type,
            event_date,
            event_time,
            event_venue,
            event_venue_final,
            event_theme,
            event_motif,
            event_guests,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/events", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM event_table");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/reservation", async (req, res) => {
    try {
        // Generate a unique reservation_id (you may need a more sophisticated approach)
        let id = "RS_" + Math.random().toString(36).substr(2, 9);

        const {
            client_id,
            client_fname,
            client_lname,
            client_email,
            client_contact,
            event_id,
            total_price,
        } = req.body;

        const query = `
          INSERT INTO reservation_table (reservation_id, client_id, client_fname, client_lname, client_email, client_contact, event_id, total_price)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `;

        const result = await pool.query(query, [
            id,
            client_id,
            client_fname,
            client_lname,
            client_email,
            client_contact,
            event_id,
            total_price,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

//get reservation client info via post using client_id
app.post("/reservation_count", async (req, res) => {
    try {
        const { client_id } = req.body;
        const result = await pool.query(
            "SELECT count(*) FROM reservation_table WHERE client_id = $1",
            [client_id]
        );
        res.json({ count: result.rows[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/reservations", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM reservation_table");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/reservations/:reservation_id", async (req, res) => {
    try {
        const { reservation_id } = req.params;
        const result = await pool.query(
            "SELECT * FROM reservation_table WHERE reservation_id = $1",
            [reservation_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/adds_on", async (req, res) => {
    try {
        let id = "AO_" + Math.random().toString(36).substr(2, 9); // Generate a unique adds_on_id (you may need a more sophisticated approach)

        const { adds_on_name, reservation_id } = req.body;

        const query = `
          INSERT INTO adds_on_table (adds_on_id, adds_on_name, reservation_id)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;

        const result = await pool.query(query, [
            id,
            adds_on_name,
            reservation_id,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error creating adds on:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.get("/adds_on/:reservation_id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM adds_on_table WHERE reservation_id = $1",
            [req.params.reservation_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/event/:event_id", async (req, res) => {
    try {
        const { event_id } = req.params;
        const result = await pool.query(
            "SELECT * FROM event_table WHERE event_id = $1",
            [event_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//     //transaction_table
// transaction_id varchar (25) //PK
// transaction_date date
// transaction_time time
// transaction_total decimal (10,2)
// transaction_status varchar (50)
// transaction_type varchar (50)
// transaction_payment varchar (50)
// reservation_id varchar (25) //FK

app.post("/transaction", async (req, res) => {
    try {
        const {
            transaction_id,
            transaction_date,
            transaction_time,
            transaction_total,
            transaction_status,
            transaction_type,
            transaction_payment,
            reservation_id,
        } = req.body;

        const query = `
          INSERT INTO transaction_table (transaction_id, transaction_date, transaction_time, transaction_total, transaction_status, transaction_type, transaction_payment, reservation_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `;

        const result = await pool.query(query, [
            transaction_id,
            transaction_date,
            transaction_time,
            transaction_total,
            transaction_status,
            transaction_type,
            transaction_payment,
            reservation_id,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.post("/reservation_food", async (req, res) => {
    try {
        const id = "RF_" + Math.random().toString(36).substr(2, 9); // Generate a unique reservation_food_id (you may need a more sophisticated approach)

        const { reservation_id, food_id } = req.body;

        const query = `
          INSERT INTO reservation_food_table (reservation_food_id, reservation_id, food_id)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;

        const result = await pool.query(query, [id, reservation_id, food_id]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error creating reservation food:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

// //reservation_food_table
// reservation_food_id varchar (25) //PK
// reservation_id varchar (25) //FK
// food_id varchar (25) //FK

app.listen(process.env.PORT, () => {
    console.log(`Server is starting on port ${process.env.PORT}`);
    console.log("Grinding, grinding, grinding... ✊");
});
