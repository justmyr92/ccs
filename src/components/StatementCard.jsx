import React from "react";

const StatementCard = () => {
    const statements = [
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus pretium purus eget viverra.",
            name: "Dr. Tirso S. Ronquillo",
            position: "CEO & President of Batangas State University",
        },
        {
            title: "Fusce efficitur mauris vitae augue vestibulum, vitae luctus ex bibendum.",
            content:
                "Fusce efficitur mauris vitae augue vestibulum, vitae luctus ex bibendum. Sed consequat euismod nisl, eget iaculis nulla tincidunt a.",
            name: "Prof. Elena M. Santiago",
            position: "Dean of Faculty of Arts and Letters, UST",
        },
        {
            title: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            content:
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non urna vulputate, tempor lacus nec, commodo orci.",
            name: "Dr. Javier R. Torres",
            position:
                "Chairman of Department of Computer Science, Ateneo de Manila University",
        },
        {
            title: "Vestibulum nec nisl et erat fermentum euismod.",
            content:
                "Vestibulum nec nisl et erat fermentum euismod. Duis pellentesque tellus vitae eros ullamcorper, vel ullamcorper augue rhoncus.",
            name: "Prof. Isabella L. Fernandez",
            position:
                "Director of Culinary Arts, De La Salle - College of Saint Benilde",
        },
        {
            title: "Suspendisse potenti. Etiam a orci vel risus facilisis gravida.",
            content:
                "Suspendisse potenti. Etiam a orci vel risus facilisis gravida. Fusce lobortis mauris vitae ipsum tristique varius.",
            name: "Dr. Juanito B. Estrella",
            position: "Director of School of Business, Far Eastern University",
        },
        {
            title: "Aliquam vehicula justo non fermentum dictum.",
            content:
                "Aliquam vehicula justo non fermentum dictum. Aenean ullamcorper libero ac sapien sollicitudin, non bibendum est venenatis.",
            name: "Prof. Maria G. Santos",
            position:
                "Head of Department of Fine Arts, University of the Philippines Diliman",
        },
        {
            title: "Praesent nec augue a elit pharetra vulputate.",
            content:
                "Praesent nec augue a elit pharetra vulputate. Sed scelerisque metus at ex dapibus, in efficitur quam scelerisque.",
            name: "Dr. Carlos P. Martinez",
            position: "Dean of College of Engineering, Mapúa University",
        },
        {
            title: "Nullam fringilla orci vitae quam efficitur rhoncus.",
            content:
                "Nullam fringilla orci vitae quam efficitur rhoncus. Sed non elit ut purus lacinia volutpat at ut ex.",
            name: "Prof. Andrea J. Reyes",
            position:
                "Chairperson of Department of Psychology, University of Santo Tomas",
        },
        {
            title: "Vivamus ut dui non quam luctus rhoncus ac in metus.",
            content:
                "Vivamus ut dui non quam luctus rhoncus ac in metus. Phasellus efficitur arcu ut posuere ultricies.",
            name: "Dr. Martin D. Abad",
            position:
                "Vice President for Academic Affairs, Polytechnic University of the Philippines",
        },
        {
            title: "Morbi efficitur libero ac nibh convallis, a condimentum lacus aliquet.",
            content:
                "Morbi efficitur libero ac nibh convallis, a condimentum lacus aliquet. Integer malesuada odio at ipsum fringilla, nec auctor felis pharetra.",
            name: "Prof. Laura S. Garcia",
            position: "Director of Institute of Nursing, Adamson University",
        },
    ];

    return (
        <>
            {statements.map((statement, index) => (
                <div
                    className={`carousel-item max-w-[23rem] h-[26rem] border bg-white
                    ${
                        index === 0
                            ? "rounded-ss-lg"
                            : index === statements.length - 1
                            ? "rounded-ee-lg border-l-0"
                            : "border-l-0"
                    }
                    `}
                    key={index}
                >
                    <div className="statement-card-container p-10">
                        <div className="statement-card-content min-h-[15rem]">
                            <h3 className="text-xl font-medium text-gray-900 mb-5 italic">
                                "{statement.title}"
                            </h3>
                            <p className="text-justify text-gray-800 text-sm">
                                {statement.content}
                            </p>
                        </div>
                        <div className="statement-card-footer border-t border-gray-200 pt-5">
                            <h3 className="text-lg font-bold text-gray-800">
                                {statement.name}
                            </h3>
                            <p className="text-start text-gray-600 text-sm">
                                {statement.position}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default StatementCard;
