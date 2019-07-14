import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonTitle,
  IonToolbar,
  IonAlert
} from "@ionic/react";
import "../App.css";
import { LOCALIZATION } from "../localization";

type Props = RouteComponentProps<{}>;

interface State {
  localization: Record<string, string>;
  showLanguageAlert: boolean;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let localLanguage : Record<string, string>;
    let localLanguageString = localStorage.getItem("language");
    switch(localLanguageString){
      case "EN":
        localLanguage = LOCALIZATION.EN;
        break;
      case "ZH_CN":
        localLanguage = LOCALIZATION.ZH_CN
        break;
      default:
        localLanguage = LOCALIZATION.EN;
    }

    this.state = {
      localization: localLanguage,
      showLanguageAlert: false
    };
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton
                onClick={() => {
                  this.setState({ showLanguageAlert: true });
                }}
              >
                {this.state.localization.LANGUAGES}
              </IonButton>
            </IonButtons>
            <IonTitle>{this.state.localization.APP_NAME}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>{this.state.localization.WELCOME_ABOARD}</h1>
          <div className="flight-code-label">SQ825 | 50A</div>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <div className="text-small">
                  {this.state.localization.TIME_TO_DESTINATION}
                </div>
                <div className="text-normal time-label">
                  <IonIcon class="time-label-icon" name="airplane" />
                  02:00
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="text-small">
                  {this.state.localization.ESTIMATED_ARRIVAL_TIME}
                </div>
                <div className="text-normal time-label">
                  <IonIcon class="time-label-icon" name="md-time" />
                  05:55
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6" class="destination-card">
                <div className="text-large">
                  {this.state.localization.SINGAPORE}
                </div>
                <div className="text-small">
                  {this.state.localization.SINGAPORE_CHANGI_AIRPORT}
                </div>
                <hr />
                <div className="text-small">
                  {this.state.localization.LOCAL_TIME}
                </div>
                <div className="text-normal">
                  {new Date().toLocaleTimeString("en-SG", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </IonCol>
              <IonCol size="6" class="destination-card">
                <div className="text-large">{this.state.localization.SHANGHAI}</div>
                <div className="text-small">
                  {this.state.localization.SHANGHAI_PUDONG_INTL_AIRPORT}
                </div>
                <hr />
                <div className="text-small">
                  {this.state.localization.LOCAL_TIME}
                </div>
                <div className="text-normal">
                  {new Date().toLocaleTimeString("en-SG", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Start of Service List */}
          <IonListHeader class="transparent">
            {this.state.localization.INFLIGHT_SERVICES}
          </IonListHeader>
          <IonList class="list transparent">
            <ServiceListItem
              labelText={this.state.localization.DINING}
              iconName="restaurant"
            />
            <ServiceListItem
              labelText={this.state.localization.KRIS_WORLD}
              iconName="tv"
            />
            <ServiceListItem
              labelText={this.state.localization.KRIS_SHOP}
              iconName="cart"
            />
            <ServiceListItem
              labelText={this.state.localization.SEAT_UPGRADE}
              iconName="md-arrow-round-up"
            />
            <ServiceListItem
              labelText={this.state.localization.CABIN_SERVICE}
              iconName="md-happy"
            />
            <ServiceListItem
              labelText={this.state.localization.FEEDBACK}
              iconName="chatbubbles"
            />
          </IonList>
        </IonContent>
        <IonAlert
          isOpen={this.state.showLanguageAlert}
          onDidDismiss={() => this.setState({ showLanguageAlert: false })}
          header={this.state.localization.LANGUAGES}
          message={this.state.localization.CHOOSE_LANGUAGE_ALERT}
          buttons={[
            {
              text: "English",
              handler: () => {
                this.setState({ localization: LOCALIZATION.EN });
                localStorage.setItem("language", "EN");
              }
            },
            {
              text: "简体中文",
              handler: () => {
                this.setState({ localization: LOCALIZATION.ZH_CN });
                localStorage.setItem("language", "ZH_CN");
              }
            },
            {
              text: this.state.localization.CANCEL,
              role: "cancel",
              cssClass: "secondary"
            }
          ]}
        />
      </>
    );
  }
}

interface ServiceListItemProps {
  labelText: string;
  iconName: string;
}
class ServiceListItem extends React.Component<ServiceListItemProps> {
  render() {
    return (
      <IonItem>
        <IonLabel>{this.props.labelText}</IonLabel>
        <IonIcon class="arrow-forward-icon" slot="end" name="arrow-forward" />
        <IonIcon class="list-icon" slot="start" name={this.props.iconName} />
      </IonItem>
    );
  }
}

export default Home;
