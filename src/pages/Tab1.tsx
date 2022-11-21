import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab1.css';
import { CalendarService } from "../services/calendar-service";
import React from "react";
import { calendarOutline } from "ionicons/icons";

const Calendar: React.FC = () => {
    const today = CalendarService.getCurrentDate();

    const labels = CalendarService.getDays().map(day => {
        return <IonCol>{ day[0] }</IonCol>;
    });

    const dates = CalendarService.getCurrentWeekDates().map(date => {
        return <IonCol onClick={ e => console.log(date) } className={ date === today ? "today" : "" }>{ date }</IonCol>;
    });

    return (
        <IonGrid className="weekly-calendar">
            <IonRow>
                <IonCol></IonCol>
                <IonCol size="auto">
                    { CalendarService.getCurrentMonth() }
                </IonCol>
                <IonCol size="auto">
                    <IonIcon icon={ calendarOutline } size="small"></IonIcon>
                </IonCol>
            </IonRow>
            <IonRow className="labels">
                { labels }
            </IonRow>
            <IonRow className="dates">
                { dates }
            </IonRow>
        </IonGrid>
    );
}

const MoodLogger: React.FC = () => {
    return (
        <div className="circle">
            <h5 className="header">Mood <br /> <span className="subheader">How do you feel?</span></h5>
            <div className="emoji">
                😃
            </div>
            <IonButton onClick={ e => console.log('Log your mood') }>
                Log mood
            </IonButton>
        </div>
    );
}

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Calendar />
                <MoodLogger />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
