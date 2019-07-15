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
  IonBackButton
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  fullscreen: boolean;
}

class DiningPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage,
      fullscreen: true
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
        <h2 style={{ textAlign: "left" }}>Lunch – Shanghai to Singapore</h2>
        <IonSlides pager={false} scrollbar={true} class="fullscreen-slides">
          <IonSlide>
            <IonCard class="fullscreen-card">
              <img
                src="https://www.singaporeair.com/saar5/images/flying-withus/dining/book-the-cook/western.jpg"
                alt="western"
                className="menu-img"
              />
              <IonCardHeader class="menu-card-header">
                <div className="menu-header">International selection</div>
                <div className="menu-subheader">appetiser</div>
                <div className="menu-text">
                  Apple and celery salad with smoked salmon
                </div>
                <div className="menu-subheader">main course</div>
                <div className="menu-text">Sauteed beef in red wine sauce</div>
                <div className="menu-subheader">dessert</div>
                <div className="menu-text">Sweet potato and orange cake</div>
                <div className="menu-subheader">from the bakery</div>
                <div className="menu-text">Roll and butter</div>
                <div className="menu-subheader">hot beverages</div>
                <div className="menu-text">Coffee - Tea</div>
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
                <div className="menu-header">Japanese selection</div>
                <div className="menu-subheader">appetiser</div>
                <div className="menu-text">Zensai - Selection of Japanese appetiser</div>
                <div className="menu-subheader">noodles</div>
                <div className="menu-text">Japanese cold noodles</div>
                <div className="menu-subheader">main course</div>
                <div className="menu-text">Seafood doria with saffron rice</div>
                <div className="menu-subheader">dessert</div>
                <div className="menu-text">Sweet potato and orange cake</div>
                <div className="menu-subheader">from the bakery</div>
                <div className="menu-text">Roll and butter</div>
                <div className="menu-subheader">hot beverage</div>
                <div className="menu-text">Green tea</div>
                <div className="menu-subheader">cold beverage</div>
                <div className="menu-text">Japanese Oolong tea</div>
              </IonCardHeader>
            </IonCard>
          </IonSlide>
        </IonSlides>
      </>
    );
  }

  private renderDetailedMenu(): JSX.Element {
    const choiceTypeList = [
      {
        typeName: "MAIN_COURSE",
        ChoiceList: [
          {
            foodName: "CHICKEN_RICE",
            subtitle: "SET_A",
            imgSrc:
              "https://www.singaporeair.com/saar5/images/flying-withus/dining/book-the-cook/singaporean-2.jpg",
            description: "CHICKEN_RICE_DESCRIPTION"
          },
          {
            foodName: "BEEF_NOODLES",
            subtitle: "SET_B",
            imgSrc:
              "https://www.singaporeair.com/saar5/images/flying-withus/dining/book-the-cook/western.jpg",
            description: "BEEF_NOODLES_DESCRIPTION"
          }
        ]
      },
      {
        typeName: "VEGETABLE",
        ChoiceList: [
          {
            foodName: "VEGETABLE_SALAD",
            subtitle: "HEALTHY_CHOICE",
            imgSrc:
              "https://www.singaporeair.com/saar5/images/flying-withus/dining/book-the-cook/singaporean-2.jpg",
            description: "VEGETABLE_SALAD_DESCRIPTION"
          }
        ]
      }
    ];
    return (
      <IonGrid>
        {choiceTypeList.map(choiceType => (
          <IonRow class="align-items-center" key={choiceType.typeName}>
            <IonCol size="3">
              <IonLabel>
                {this.state.localization[choiceType.typeName]}
              </IonLabel>
            </IonCol>
            <IonCol size="9">
              <IonSlides pager={false} scrollbar={true}>
                {choiceType.ChoiceList.map(choice => (
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
                            description:this.state.localization[choice.description]
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
            </IonCol>
          </IonRow>
        ))}
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
