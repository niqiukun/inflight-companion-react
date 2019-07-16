import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSlide,
  IonContent,
  IonSlides,
  IonGrid,
  IonCol,
  IonLabel,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonListHeader,
  IonButton,
  IonModal
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  fullscreen: boolean;
  showModal1: boolean;
  showModal2: boolean;
}

class DiningPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage,
      fullscreen: true,
      showModal1: false,
      showModal2: false
    };
  }

  private renderMenu(): JSX.Element {
    if (this.state.fullscreen) {
      return this.renderFullscreenMenu();
    } else {
      return this.renderDetailedMenu();
    }
  }

  private renderFullscreenMenu(): JSX.Element {
    return (
      <>
        <IonListHeader>Meals</IonListHeader>
        <IonSlides pager={true} scrollbar={false} class="fullscreen-slides">
          <IonSlide>
            <IonCard class="fullscreen-card">
              <img
                src="https://www.singaporeair.com/saar5/images/flying-withus/dining/book-the-cook/western.jpg"
                alt="western"
                className="menu-img"
              />
              <IonCardHeader class="menu-card-header">
                <div className="menu-header">International selection</div>
                <div className="menu-dishname">
                  Grilled beef fillet with balsamic onion sauce
                </div>
                <div className="menu-text">
                  Grilled beef with asparagus, baby spinach, crushed potato, and
                  served with balsamic onion sauce.
                </div>
                <IonButton
                  size="small"
                  class="menu-btn"
                  fill="outline"
                  onClick={() => this.setState({ showModal1: true })}
                >
                  Full Menu
                </IonButton>
                <IonModal
                  isOpen={this.state.showModal1}
                  onDidDismiss={() => this.setState({ showModal1: false })}
                  cssClass="menu-modal"
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Full Menu</IonTitle>
                      <IonButtons slot="end">
                        <IonButton
                          onClick={() => this.setState({ showModal1: false })}
                        >
                          Close
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <div className="full-menu">
                    <div className="menu-header">International selection</div>
                    <div className="menu-subheader">appetiser</div>
                    <div className="menu-text">
                      Apple and celery salad with smoked salmon
                    </div>
                    <div className="menu-subheader">main course</div>
                    <div className="menu-text">
                      Grilled beef fillet with balsamic onion sauce
                    </div>
                    <div className="menu-subheader">dessert</div>
                    <div className="menu-text">
                      Sweet potato and orange cake
                    </div>
                    <div className="menu-subheader">from the bakery</div>
                    <div className="menu-text">Roll and butter</div>
                    <div className="menu-subheader">hot beverages</div>
                    <div className="menu-text">Coffee - Tea</div>
                  </div>
                </IonModal>
              </IonCardHeader>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard class="fullscreen-card">
              <img
                src="https://www.singaporeair.com/saar5/images/flying-withus/dining/book-the-cook/singaporean-2.jpg"
                alt="chinese"
                className="menu-img"
              />
              <IonCardHeader class="menu-card-header">
                <div className="menu-header">Oriental selection</div>
                <div className="menu-dishname">
                  Seafood doria with saffron rice
                </div>
                <div className="menu-text">
                  Japanese style mixed seafood ragout on saffron rice with yuzu
                  pepper cream sauce and parmesan.
                </div>
                <IonButton
                  size="small"
                  class="menu-btn"
                  fill="outline"
                  onClick={() => this.setState({ showModal2: true })}
                >
                  Full menu
                </IonButton>
                <IonModal
                  isOpen={this.state.showModal2}
                  onDidDismiss={() => this.setState({ showModal2: false })}
                  cssClass="menu-modal"
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Full Menu</IonTitle>
                      <IonButtons slot="end">
                        <IonButton
                          onClick={() => this.setState({ showModal2: false })}
                        >
                          Close
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <div className="full-menu">
                    <div className="menu-header">Oriental selection</div>
                    <div className="menu-subheader">appetiser</div>
                    <div className="menu-text">
                      Zensai - Selection of Japanese appetiser
                    </div>
                    <div className="menu-subheader">noodles</div>
                    <div className="menu-text">Japanese cold noodles</div>
                    <div className="menu-subheader">main course</div>
                    <div className="menu-text">
                      Seafood doria with saffron rice
                    </div>
                    <div className="menu-subheader">dessert</div>
                    <div className="menu-text">
                      Sweet potato and orange cake
                    </div>
                    <div className="menu-subheader">from the bakery</div>
                    <div className="menu-text">Roll and butter</div>
                    <div className="menu-subheader">hot beverage</div>
                    <div className="menu-text">Green tea</div>
                    <div className="menu-subheader">cold beverage</div>
                    <div className="menu-text">Japanese Oolong tea</div>
                  </div>
                </IonModal>
              </IonCardHeader>
            </IonCard>
          </IonSlide>
        </IonSlides>
      </>
    );
  }

  private renderDetailedMenu(): JSX.Element {
    return (
      <IonGrid>
        <IonRow class="align-items-center">
          <IonCol size="3">
            <IonLabel>Types</IonLabel>
          </IonCol>
          <IonCol size="9">
            <IonSlides pager={false} scrollbar={true}>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>
        <IonRow class="align-items-center">
          <IonCol size="3">
            <IonLabel>Types</IonLabel>
          </IonCol>
          <IonCol size="9">
            <IonSlides pager={false} scrollbar={true}>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>
        <IonRow class="align-items-center">
          <IonCol size="3">
            <IonLabel>Types</IonLabel>
          </IonCol>
          <IonCol size="9">
            <IonSlides pager={false} scrollbar={true}>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <IonCard>
                  <img
                    src="https://ionicframework.com/docs/demos/api/card/madison.jpg"
                    alt="jsx-a11y/alt-text"
                  />
                  <IonCardHeader>
                    <IonCardTitle>Destination</IonCardTitle>
                    <IonCardSubtitle>Singapore</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Singapore is a city state.</IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle
              onClick={() =>
                this.setState(prevState => ({
                  fullscreen: !prevState.fullscreen
                }))
              }
            >
              {this.state.localization.DINING}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>{this.renderMenu()}</IonContent>
      </>
    );
  }
}

export default DiningPage;


private renderBackup(): JSX.Element {
  const choiceList = [
    {
      foodName: "CHICKEN_RICE",
      subtitle: "SET_A",
      imgSrc: "https://ionicframework.com/docs/demos/api/card/madison.jpg",
      description: "CHICKEN_RICE_DESCRIPTION"
    },
    {
      foodName: "BEEF_NOODLES",
      subtitle: "SET_B",
      imgSrc: "https://ionicframework.com/docs/demos/api/card/madison.jpg",
      description: "BEEF_NOODLES_DESCRIPTION"
    }
  ];
  return (
    <IonSlides pager={false} scrollbar={true} class="fullscreen-slides">
      {choiceList.map(choice => (
        <IonSlide key={this.state.localization[choice.foodName]}>
          <IonCard
            class="fullscreen-card"
            onClick={() =>
              this.props.history.push({
                pathname: "/food",
                state: {
                  foodName: this.state.localization[choice.foodName],
                  subtitle: this.state.localization[choice.subtitle],
                  imgSrc: this.state.localization[choice.imgSrc],
                  description: this.state.localization[choice.description]
                }
              })
            }
          >
            <img src={choice.imgSrc} alt="jsx-a11y/alt-text" />
            <IonCardHeader>
              <IonCardTitle>
                {this.state.localization[choice.foodName]}
              </IonCardTitle>
              <IonCardSubtitle>
                {this.state.localization[choice.subtitle]}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {this.state.localization[choice.description]}
            </IonCardContent>
          </IonCard>
        </IonSlide>
      ))}
    </IonSlides>
  );
}

