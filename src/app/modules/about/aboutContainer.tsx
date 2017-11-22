import * as React from 'react';

interface AboutContainerPropsInterface {
}

interface AboutContainerStateInterface {
}

class AboutContainer extends React.Component<AboutContainerPropsInterface, AboutContainerStateInterface> {
    constructor(props: AboutContainerPropsInterface, context: any) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <h1>Hakkımızda</h1>

                <p className="margin-top-15px">
                    Bu organizasyon GitHub'ın kendi doğal araçları kullanılarak açık kaynak'a katkı sağlamak amacıyla oluşturulmuştur.<br />
                    <br />
                    Türkiye'de geliştirilen açık kaynaklı çalışmalar için bir indeks oluşturarak, açık kaynak projelerin tanınması için imkanlar sağlamaya çalışıyoruz.<br />
                    <br />
                    Bunu aynı zamanda bir "networking" olarak düşünürsek; hem indeksimizde yer alan proje linkleri hem de slack grubumuz aracılığıyla açık kaynak projelerine katılımcı bulmak, bu insanlarla iletişime geçmek ve gerek fikir gerek çalışma bazında yardımlaşma için bir platform görevini üstleniyoruz.
                    <br />
                    Aynı zamanda; açık kaynak felsefesini çeşitli kaynak/içerik destekleriyle kullanıcılara aktarmak ve projelere nasıl katkıda bulunabileceği konusunda rehberlik etmek amaçlarımız arasında.<br />
                    <br />
                    Eğer proje ve birlikte çalışma deneyimini arttırmak isteyen, başka platformlarda geliştirme yapmak konusunda bir başlangıç arayan bir yazılımcı veya yazılımcı grubuysanız, burada kolaylıkla sizden yardım bekleyen bir proje bulabilirsiniz.<br />
                    <br />
                    Çevrenize de bizden bahsedin, açık kaynak toplulukta hep birlikte iletişimde ve girişimde olalım.
                </p>

                <p className="text-right text-muted">
                    <a href="http://acikkaynak.info/">açık kaynak inisiyatifi</a>
                </p>
            </div>
        );
    }
}

export {
    AboutContainerPropsInterface,
    AboutContainerStateInterface,
    AboutContainer,
};

export default AboutContainer;
