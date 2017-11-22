import * as React from 'react';

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
                    Bu organizasyon GitHub'ın kendi doğal araçları kullanılarak açık kaynak'a katkı sağlamak amacıyla oluşturulmuştur.<br />
                    <br />
                    Türkiyede geliştirilen açık kaynaklı çalışmalar için bir indeks oluşturarak, açık kaynak projelerin tanınması için imkanlar sağlamaya çalışıyoruz.<br />
                    <br />
                    Bunu aynı zamanda bir "networking" olarak düşünürsek; hem indeksimizde yer alan proje linkleri hem de slack grubumuz aracılığıyla açık kaynak projelerine katılımcı bulmak, bu insanlarla iletişime geçmek ve gerek fikir gerek çalışma bazında yardımlaşma için bir platform görevini üstleniyoruz.
                    <br />
                    Aynı zamanda; açık kaynak felsefesini çeşitli kaynak/içerik destekleriyle kullanıcılara aktarmak ve projelere nasıl katkıda bulunabileceği konusunda rehberlik etmek amaçlarımız arasında.<br />
                    <br />
                    Eğer proje ve birlikte çalışma deneyimini arttırmak isteyen, başka platformlarda geliştirme yapmak konusunda bir başlangıç arayan bir yazılımcı veya organizasyonsanız, veya yalnızca açık kaynak'a katılımcı olmak istiyorsanız inisiyatifimiz aracılığıyla kendinize katılım sağlayabileceğiniz, sizden yardım bekleyen bir proje bulabilirsiniz.<br />
                    <br />
                    Daha da iyisi <a href="https://github.com/acikkaynak/acikkaynak">açık kaynak repository'si</a> altında "issue" oluşturarak, (örneğin) Bootstrap üzerinde istediğiniz bir özelliği diğer kişilere tanıtarak bunun dökümantasyonundan testlerinde kadar ilgilenecek bir ekip oluşturup Bootstrap'in istediği standartlarda bir Pull Request hazırlayabilirsiniz.<br />
                    <br />
                    Çevrenize de bizden bahsedin, Türkçe de konuşan bir açık kaynak toplulukta hep birlikte iletişimde ve girişimde olalım.
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
