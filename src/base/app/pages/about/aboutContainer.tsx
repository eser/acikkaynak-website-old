import * as React from 'react';

interface AboutContainerProps {
}

interface AboutContainerState {
}

class AboutContainer extends React.Component<AboutContainerProps, AboutContainerState> {
    constructor(props: AboutContainerProps, context: any) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <h1>Hakkımızda</h1>

                <div className="margin-top-15px">
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
                </div>

                <div className="has-text-right">
                    <a href="http://acikkaynak.info/">açık kaynak inisiyatifi</a>
                </div>
            </React.Fragment>
        );
    }
}

export {
    AboutContainer as default,
    AboutContainerProps,
    AboutContainerState,
};
