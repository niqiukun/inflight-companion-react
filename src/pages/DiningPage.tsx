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
  IonCol,
  IonButton,
  IonIcon
} from "@ionic/react";
import "../App.css";
import { LanguageType, LOCALIZATION } from "../localization";
import { FOOD_TYPES, FoodInfo } from "../text/food";
import DiningModeAlert from "../components/DiningModeAlert";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  selectedTypeName: string;
  showDiningModeAlert: boolean;
}

class DiningPage extends React.Component<Props, State> {
  private recommended: FoodInfo[];
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.recommended = [];
    this.getRecommended();

    this.state = {
      localization: localLanguage,
      selectedTypeName: this.recommended.length > 0 ? "Recommended" : "Set",
      showDiningModeAlert: false
    };
  }

  private getRecommended() {
    let recommendedName = JSON.parse(
      localStorage.getItem("Recommended") || "[]"
    );
    for (var foodName of recommendedName) {
      let foodInfo = this.findFoodInfo(foodName);
      if (foodInfo) {
        this.recommended.push(foodInfo);
      }
    }
  }

  private findFoodInfo(foodName: string): FoodInfo | undefined {
    let foodInfoFound: FoodInfo | undefined = undefined;
    for (let foodType of FOOD_TYPES) {
      for (let foodInfo of foodType.FoodList) {
        if (foodName === foodInfo.foodName) {
          foodInfoFound = foodInfo;
          break;
        }
      }
      if (foodInfoFound) break;
    }
    return foodInfoFound;
  }

  private renderCard(): JSX.Element {
    return (
      <IonGrid>
        <IonRow>
          {this.state.selectedTypeName === "Recommended" ? (
            this.recommended.map(food => (
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
                  <img src={food.imgSrc} alt="food" />
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
          ) : (
            <></>
          )}
          {FOOD_TYPES.map(foodType =>
            foodType.TypeName !== this.state.selectedTypeName
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
                      <img src={food.imgSrc} alt="food" />
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
        {this.recommended.length > 0 ? (
          <IonSegmentButton mode="md" value="Recommended" key="Recommended">
            <IonLabel>Recommended</IonLabel>
          </IonSegmentButton>
        ) : (
          <></>
        )}
        {FOOD_TYPES.map(foodType => (
          <IonSegmentButton
            mode="md"
            value={foodType.TypeName}
            key={foodType.TypeName}
          >
            <IonLabel>{foodType.TypeName}</IonLabel>
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
            <IonButtons slot="end">
              <IonButton
                onClick={() => this.setState({ showDiningModeAlert: true })}
              >
                <IonIcon name="more" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar className="dining-page-toolbar">
            {this.renderSegment()}
          </IonToolbar>
        </IonHeader>
        <IonContent>{this.renderCard()}</IonContent>
        <DiningModeAlert
          showAlert={this.state.showDiningModeAlert}
          closeAlert={() => this.setState({ showDiningModeAlert: false })}
          currentModeIsA={false}
        />
      </>
    );
  }
}

export default DiningPage;
