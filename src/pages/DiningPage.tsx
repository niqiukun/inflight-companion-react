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

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  selectedTypeName: string;
}

const choiceTypeList = [
  {
    typeName: "Main Course",
    ChoiceList: [
      {
        foodName: "Chicken Rice",
        subtitle: "Set A",
        imgSrc: "/assets/img/meals/chinese.jpg",
        shortDescription: "204 Cal\nPrice: Free\n",
        description: ""
      },
      {
        foodName: "Beef Noodles",
        subtitle: "Set B",
        imgSrc: "/assets/img/meals/western.jpg",
        shortDescription: "250 Cal\nPrice: Free"
      },
      {
        foodName: "Beef Noodles Super",
        subtitle: "Set B",
        imgSrc: "/assets/img/meals/western.jpg",
        shortDescription: "280 Cal\nPrice: Free"
      }
    ]
  },
  {
    typeName: "Vegetable",
    ChoiceList: [
      {
        foodName: "Vegetable Salad",
        subtitle: "Healthy Choice",
        imgSrc: "/assets/img/meals/chinese.jpg",
        shortDescription: "Calories: 104cal\nPrice: Free"
      }
    ]
  }
];

class DiningPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage: Record<string, string>;
    let localLanguageString = localStorage.getItem("language") || "EN";
    localLanguage = LOCALIZATION[localLanguageString as LanguageType];

    this.state = {
      localization: localLanguage,
      selectedTypeName: "Main Course"
    };
  }

  private renderCard(): JSX.Element {
    return (
      <IonGrid>
        <IonRow>
          {choiceTypeList.map(choiceType =>
            choiceType.typeName !== this.state.selectedTypeName
              ? null
              : choiceType.ChoiceList.map(food => (
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
                      <img src={food.imgSrc}></img>
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
          this.setState({ selectedTypeName: e.detail.value || "Main Course" })
        }
      >
        {choiceTypeList.map(choiceType => (
          <IonSegmentButton
            mode="md"
            value={choiceType.typeName}
            key={choiceType.typeName}
          >
            <IonLabel>{choiceType.typeName}</IonLabel>
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
