import { firebase } from "@react-native-firebase/database";

const reference = firebase
    .app()
    .database('https://komunalka-home-default-rtdb.firebaseio.com/')

export const databaseFirebase = (value: string) => {
    return reference.ref(value)
}