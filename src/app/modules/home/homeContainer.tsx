import * as React from 'react';
import { Link } from 'react-router-dom';

interface HomeContainerPropsInterface {
}

interface HomeContainerStateInterface {
}

class HomeContainer extends React.Component<HomeContainerPropsInterface, HomeContainerStateInterface> {
    constructor(props: HomeContainerPropsInterface, context: any) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <img src={require('../../assets/images/acikkaynak-logo-142px.png')} alt="açık kaynak" />
                <p className="margin-top-15px">
                    Merhaba,<br />
                    <br />
                    Şu anda Graphcool ile altyapımızı oluşturmakla meşguluz. Şimdilik <Link to="/about">Hakkımızda</Link> bölümünden bizimle ilgili bilgi alabilir veya <Link to="/projects/">Projeler</Link> bağlantısı altından açık kaynak proje indeksimize ulaşabilirsiniz.<br />
                    <br />
                    Biz çalışırken açık kaynak dünyasından ve organizasyonumuzdan uzakta kalmamak için <a href="https://twitter.com/acikkaynakinfo">Twitter Hesabımız</a>ı takibe alabileceğiniz gibi, <a href="https://s.acikkaynak.info">Slack grubumuza katılmak için davetiye</a> talebinde de bulunabilirsiniz.
                </p>
                <p className="text-right text-muted">
                    <a href="http://acikkaynak.info/">açık kaynak inisiyatifi</a>
                </p>
            </div>
        );
    }
}

export {
    HomeContainerPropsInterface,
    HomeContainerStateInterface,
    HomeContainer,
};

export default HomeContainer;
