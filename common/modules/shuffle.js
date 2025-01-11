export default function shuffle(array) { //Fisher-Yates, O(n)
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m);
        m--;
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}