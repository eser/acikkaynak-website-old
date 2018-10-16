import * as React from 'react';
import { Link } from 'react-router-dom';

import logo = require('../../assets/images/acikkaynak-logo-142px.png');

interface HomeContainerProps {
}

interface HomeContainerState {
}

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
    constructor(props: HomeContainerProps, context: any) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <div>
                    <img src={logo} alt="açık kaynak" />
                </div>
                <div className="margin-top-15px">
                    Merhaba,<br />
                    <br />
                    Şu anda Graphcool ile altyapımızı oluşturmakla meşguluz. Şimdilik <Link to="/about">Hakkımızda</Link> bölümünden bizimle ilgili bilgi alabilir veya <Link to="/projects/">Projeler</Link> bağlantısı altından açık kaynak proje indeksimize ulaşabilirsiniz.<br />
                    <br />
                    Biz çalışırken açık kaynak dünyasından ve organizasyonumuzdan uzakta kalmamak için <a href="https://twitter.com/acikkaynakinfo">Twitter Hesabımız</a>ı takibe alabileceğiniz gibi, <a href="https://acikkaynak-slack-inviter.herokuapp.com/">Slack grubumuza katılmak için davetiye</a> talebinde de bulunabilirsiniz.
                </div>
                <div className="margin-top-15px has-text-right">
                    <a href="http://acikkaynak.info/">açık kaynak inisiyatifi</a>
                </div>
            </React.Fragment>
        );
    }
}

export {
    HomeContainer as default,
    HomeContainerProps,
    HomeContainerState,
};
