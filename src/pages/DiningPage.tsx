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
}

class DiningPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage
    };
  }

  private renderMenu(): JSX.Element {
    const choiceTypeList = [
      {
        typeName: "MAIN_COURSE",
        ChoiceList: [
          {
            foodName: "CHICKEN_RICE",
            subtitle: "SET_A",
            imgSrc: "/assets/img/meals/chinese.jpg",
            description: "CHICKEN_RICE_DESCRIPTION"
          },
          {
            foodName: "BEEF_NOODLES",
            subtitle: "SET_B",
            imgSrc: "/assets/img/meals/western.jpg",
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
            imgSrc: "/assets/img/meals/chinese.jpg",
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
                            description: this.state.localization[
                              choice.description
                            ]
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
              onClick={() => {
                window.location.href = "/simple-dining";
              }}
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
