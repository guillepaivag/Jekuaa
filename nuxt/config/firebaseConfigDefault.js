let firebaseConfig = {
  apiKey: "AIzaSyDTuZ91o553zO6Y6d9pc-GJfLfx0ymUhO8",
  authDomain: "jekuaa-py.firebaseapp.com",
  projectId: "jekuaa-py",
  storageBucket: "jekuaa-py.appspot.com",
  messagingSenderId: "398733523589",
  appId: "1:398733523589:web:a81a563f56ee090419c7ec",
  measurementId: "G-LQ50CKSC1T"
}

if (process.env.NODE_ENV === 'development') {
  firebaseConfig = {
    apiKey: "AIzaSyApTzC0Gcn_aR27DsPpng1FX_pIdru6vVc",
    authDomain: "jekuaa-py-dev.firebaseapp.com",
    projectId: "jekuaa-py-dev",
    storageBucket: "jekuaa-py-dev.appspot.com",
    messagingSenderId: "982061082559",
    appId: "1:982061082559:web:d3288d2cfbfff7474f630a",
    measurementId: "G-S5MD8F2D0M"
  }
}

export default firebaseConfig