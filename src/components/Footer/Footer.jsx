import './index.css';
import SocialIcons from './SocialIcons/SocialIcons';

const Footer = ({ footer = { cta: '', social_icons: [] } }) => {
    return (
        <section data-testid="footer" className="footer_section">
            <div className="footer_accent">{footer.cta}</div>
            <div className="social_icons">
                <SocialIcons social_icons={footer.social_icons} />
            </div>
            <div className="footer_animation"></div>
        </section>
    );
};

export default Footer;
