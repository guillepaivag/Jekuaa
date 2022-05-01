let firebaseConfig = {
  apiKey: "AIzaSyDTuZ91o553zO6Y6d9pc-GJfLfx0ymUhO8",
  authDomain: "jekuaa-py.firebaseapp.com",
  projectId: "jekuaa-py",
  storageBucket: "prod-j-fotos-perfiles-v",
  messagingSenderId: "398733523589",
  appId: "1:398733523589:web:ecfa876a42bccb2619c7ec",
  measurementId: "G-E7CGPS9YHV"
}

if (process.env.NODE_ENV === 'development') {
  firebaseConfig = {
    apiKey: "AIzaSyApTzC0Gcn_aR27DsPpng1FX_pIdru6vVc",
    authDomain: "jekuaa-py-dev.firebaseapp.com",
    projectId: "jekuaa-py-dev",
    storageBucket: "dev-j-fotos-perfiles-v",
    messagingSenderId: "982061082559",
    appId: "1:982061082559:web:85f90142e84644254f630a",
    measurementId: "G-WBJGK2TMVX"
  }
}

export default firebaseConfig