import './index.css';

const AboutMe = ({ about_me = { title: '', text: '' } }) => {
    return (
        <section className="about_me_section">
            <h1 className="about_me_title">{about_me.title}</h1>
            <div className="about_me_text">{about_me.text}</div>
        </section>
    );
};

export default AboutMe;
