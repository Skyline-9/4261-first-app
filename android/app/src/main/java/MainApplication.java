import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
import io.invertase.firebase.firestore.ReactNativeFirebaseAppPackage;
public class MainApplication extends Application implements ReactApplication {
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.asList(
        new MainReactPackage(),
        new ReactNativeFirebaseFirestorePackage(),
        new ReactNativeFirebaseAppPackage()
        )
    }
}