import ContactForm from "./components/ContactForm";

const ContactUs = () => {
    return (
        <div className="flex items-center justify-between gap-4">
            <ContactForm/>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <a
                    href="https://yandex.uz/maps/org/najot_ta_lim/94800077397/?utm_medium=mapframe&utm_source=maps"
                    style={{
                        color: "#eee",
                        fontSize: "12px",
                        position: "absolute",
                        top: 0,
                    }}
                >
                    Najot Ta'lim
                </a>
                <a
                    href="https://yandex.uz/maps/10335/tashkent/category/educational_center/184106168/?utm_medium=mapframe&utm_source=maps"
                    style={{
                        color: "#eee",
                        fontSize: "12px",
                        position: "absolute",
                        top: 14,
                    }}
                >
                    Учебный центр в Ташкенте
                </a>
                <a
                    href="https://yandex.uz/maps/10335/tashkent/category/computer_courses/184106158/?utm_medium=mapframe&utm_source=maps"
                    style={{
                        color: "#eee",
                        fontSize: "12px",
                        position: "absolute",
                        top: 28,
                    }}
                >
                    Компьютерные курсы в Ташкенте
                </a>
                <iframe
                    src="https://yandex.uz/map-widget/v1/?ll=69.203690%2C41.285715&mode=search&oid=94800077397&ol=biz&z=20.47"
                    width="560"
                    height="400"
                    frameBorder="1"
                    allowFullScreen={true}
                    style={{ position: "relative" }}
                    title="Najot Ta'lim Map"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;

