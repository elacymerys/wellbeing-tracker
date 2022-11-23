import {
    IonButton, IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon, IonModal,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab1.css';
import { CalendarService } from "../services/calendar-service";
import React, { useRef, useState } from "react";
import { calendarOutline } from "ionicons/icons";

const MOOD_EMOJIS: string[] = ["😶", "😱", "😨", "🙁", "😕", "😐", "🙂", "😊", "😃", "😁", "😎"];

const Calendar: React.FC = () => {
    const today = CalendarService.getCurrentDate();

    const daysOfWeek = CalendarService.getDays().map(day => {
        return <IonCol>{ day[0] }</IonCol>;
    });

    const dates = CalendarService.getCurrentWeekDates().map(date => {
        return <IonCol onClick={ () => console.log(date) } className={ date === today ? "today" : "" }>{ date }</IonCol>;
    });

    return (
        <IonGrid>
            <IonRow>
                <IonCol></IonCol>
                <IonCol size="auto">
                    { CalendarService.getCurrentMonth() }
                </IonCol>
                <IonCol size="auto">
                    <IonIcon icon={ calendarOutline } size="small"></IonIcon>
                </IonCol>
            </IonRow>
            <IonRow className="days">
                { daysOfWeek }
            </IonRow>
            <IonRow className="dates">
                { dates }
            </IonRow>
        </IonGrid>
    );
}

const MoodLogger: React.FC = () => {
    const modal = useRef<HTMLIonModalElement>(null);

    const [moodEmojiId, setMoodEmojiId] = useState<number>(0);
    const [chosenMoodEmojiId, setChosenMoodEmojiId] = useState<number>(0);

    const moodEmojis = (ids: number[]) => ids.map(id => (
        <IonCol className="mood-emoji" onClick={ () => setChosenMoodEmojiId(id) }>{ MOOD_EMOJIS[id] }</IonCol>
    ));

    const moodScale = (ids: number[]) => ids.map(id => (
        <IonCol className="mood-scale-rate">{ id }</IonCol>
    ));

    const confirm = () => {
        setMoodEmojiId(chosenMoodEmojiId);
        modal.current?.dismiss();
    }

    return (
        <div className="circle">
            <h5 className="header">Mood <br /> <span className="subheader">How do you feel?</span></h5>
            <div className="emoji">
                { MOOD_EMOJIS[moodEmojiId] }
            </div>
            <IonButton id="open-modal" >
                Log mood
            </IonButton>
            <IonModal ref={ modal } trigger="open-modal">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={ () => modal.current?.dismiss() }>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle className="header">Your Mood</IonTitle>
                        <IonButtons slot="end">
                            <IonButton strong={ true } onClick={ () => confirm() }>
                                Confirm
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonTitle className="modal-subheader">Rate your mood:</IonTitle>
                    <IonGrid>
                        <IonRow className="mood-scale">
                            { moodScale([10, 9, 8, 7, 6]) }
                        </IonRow>
                        <IonRow className="mood-emojis">
                            { moodEmojis([10, 9, 8, 7, 6]) }
                        </IonRow>
                        <IonRow className="mood-scale">
                            { moodScale([5, 4, 3, 2, 1]) }
                        </IonRow>
                        <IonRow className="mood-emojis">
                            { moodEmojis([5, 4, 3, 2, 1]) }
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </div>
    );
}

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="header">Mood Tracker</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle className="header" size="large">Mood Tracker</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Calendar />
                <MoodLogger />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
