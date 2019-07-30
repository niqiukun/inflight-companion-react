import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonGrid,
  IonLabel,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonCol
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { FOOD_TYPES } from "../text/food";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  selectedTypeName: string;
}

class DiningPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage,
      selectedTypeName: "Set"
    };
  }

  private renderCard(): JSX.Element {
    return (
      <IonGrid>
        <IonRow>
          {FOOD_TYPES.map(foodType =>
            foodType.typeName !== this.state.selectedTypeName
              ? null
              : foodType.FoodList.map(food => (
                  <IonCol size="6" key={food.foodName}>
                    <IonCard
                      className="dining-page-card"
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/food",
                          state: { foodInfo: food }
                        })
                      }
                    >
                      <img src={food.imgSrc} alt="food"></img>
                      <IonCardHeader className="dining-page-card">
                        <IonCardTitle className="dining-page-card">
                          {food.foodName}
                        </IonCardTitle>
                        <IonCardSubtitle>{food.subtitle}</IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent className="dining-page-card">
                        {food.shortDescription}
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))
          )}
        </IonRow>
      </IonGrid>
    );
  }

  private renderSegment(): JSX.Element {
    return (
      <IonSegment
        scrollable
        mode="md"
        className="dining-page-segment"
        value={this.state.selectedTypeName}
        onIonChange={e =>
          this.setState({ selectedTypeName: e.detail.value || "Set" })
        }
      >
        {FOOD_TYPES.map(foodType => (
          <IonSegmentButton
            mode="md"
            value={foodType.typeName}
            key={foodType.typeName}
          >
            <IonLabel>{foodType.typeName}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>
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
          <IonToolbar className="dining-page-toolbar">
            {this.renderSegment()}
          </IonToolbar>
        </IonHeader>
        <IonContent>{this.renderCard()}</IonContent>
      </>
    );
  }
}

export default DiningPage;
