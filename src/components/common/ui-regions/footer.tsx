import React from 'react';

import './footer.less';

const website_domain = process.env['ALTERNATE_DOMAIN'];
const current_year = new Date().getFullYear();

export const Footer: React.FC = (): React.ReactElement => {
    return (
        <footer className="footer">
            <div className="footer_copyright">
                <p>&copy; 2020-{current_year}, Prizeout, Inc. All rights reserved.</p>
            </div>
            <ul className="footer__links">
                <li className="footer__link">
                    <a href={`https://${website_domain}/privacy/`} target="_blank" rel="noreferrer">
                        Privacy Policy
                    </a>
                    &nbsp;|&nbsp;
                </li>
                <li className="footer__link">
                    <a href={`https://${website_domain}/terms/`} target="_blank" rel="noreferrer">
                        Prizeout Terms of Use
                    </a>
                    &nbsp;|&nbsp;
                </li>
                <li className="footer__link">
                    <a
                        href={`https://${website_domain}/privacy/index.html#infocollect`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        California Info We Collect
                    </a>
                    &nbsp;|&nbsp;
                </li>
                <li className="footer__link">
                    <a
                        href="https://privacyportal.cookiepro.com/webform/20dcda57-44d2-4622-b07c-30902b02fbd4/9211ec70-941f-4529-9e43-027527ed5e2f"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Do Not Sell My Personal Information
                    </a>
                </li>
            </ul>
        </footer>
    );
};
