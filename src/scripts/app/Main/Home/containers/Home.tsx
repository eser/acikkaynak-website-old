import * as React from 'react';

export interface HomePropsInterface {
}

export interface HomeStateInterface {
}

export class Home extends React.Component<HomePropsInterface, HomeStateInterface> {

    state: HomeStateInterface;

    constructor(props: HomePropsInterface) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <img src="./src/images/acikkaynak-logo-142px.png" alt="açık kaynak" />
                <p className="margin-top-15px">
                    Merhaba,<br />
                    <br />
                    Bu organizasyon GitHub'ın kendi doğal araçları kullanılarak Türkçe konuşan kullanıcıların açık kaynaklı projelere katkı sağlamasına yardımcı olmak amacıyla oluşturulmuştur.<br />
                    <br />
                    Amaçları arasında,
                    <ul>
                        <li>Açık kaynak felsefesini çeşitli kaynak/içerik destekleriyle kullanıcılara aktarmak,</li>
                        <li>Açık kaynak projelere nasıl katkıda bulunabileceği konusunda kaynak/içerik sağlamak,</li>
                        <li>Türkçe konuşan kullanıcıların teknik veya dil bariyerlerinin kaldırması için çalışmalar yapmak,</li>
                        <li>Kullanıcıların kendi veya başka açık kaynak projelerini tanıtması için imkan sağlamak,</li>
                        <li>Halihazırda veya yeni açık kaynak projelerine katılımcı bulmak,</li>
                        <li>Birlikte çalışma ve katılım için insanlara bir platform sunmak,</li>
                    </ul>
                    bulunmaktadır.<br />
                    <br />
                    Eğer proje ve birlikte çalışma deneyimini arttırmak isteyen, başka platformlarda geliştirme yapmak konusunda bir başlangıç arayan bir yazılımcıysanız, veya yalnızca açık kaynak'a katılımcı olmak istiyorsanız bu adresi ziyaret edip kendinize katılım sağlayabileceğiniz, sizden yardım bekleyen bir proje bulabilirsiniz.<br />
                    <br />
                    Daha da iyisi <a href="https://github.com/acikkaynak/acikkaynak">açık kaynak repository'si</a> altında "issue" oluşturarak, (örneğin) Bootstrap üzerinde istediğiniz bir özelliği diğer kişilere tanıtarak bunun dökümantasyonundan testlerinde kadar ilgilenecek bir ekip oluşturup Bootstrap'in istediği standartlarda bir Pull Request hazırlayabilirsiniz.
                </p>
                <p className="text-right text-muted">
                    <a href="http://acikkaynak.info/">açık kaynak inisiyatifi</a>
                </p>
            </div>
        );
    }

}

export default Home;
