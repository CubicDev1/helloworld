Run gradlew

2m 50s


Running 'gradlew :app:assembleRelease' in /home/expo/workingdir/build/android
Welcome to Gradle 9.0.0!
Here are the highlights of this release:
- Configuration Cache is the recommended execution mode
 - Gradle requires JVM 17 or higher to run
 - Build scripts use Kotlin 2.2 and Groovy 4.0
 - Improved Kotlin DSL script compilation avoidance
For more details see https://docs.gradle.org/9.0.0/release-notes.html
To honour the JVM settings for this build a single-use Daemon process will be forked. For more on this, please refer to https://docs.gradle.org/9.0.0/userguide/gradle_daemon.html#sec:disabling_the_daemon in the Gradle documentation.
Daemon will be stopped at the end of the build
> Task :gradle-plugin:settings-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:shared:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:pluginDescriptors
> Task :gradle-plugin:settings-plugin:pluginDescriptors
> Task :gradle-plugin:settings-plugin:processResources
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:processResources
> Task :gradle-plugin:shared:processResources NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:processResources NO-SOURCE
> Task :gradle-plugin:shared:compileKotlin
> Task :gradle-plugin:shared:compileJava NO-SOURCE
> Task :gradle-plugin:shared:classes UP-TO-DATE
> Task :gradle-plugin:shared:jar
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:classes UP-TO-DATE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:jar
> Task :gradle-plugin:settings-plugin:compileKotlin
> Task :gradle-plugin:settings-plugin:compileJava NO-SOURCE
> Task :gradle-plugin:settings-plugin:classes
> Task :gradle-plugin:settings-plugin:jar
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:classes
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:jar
> Task :expo-gradle-plugin:expo-autolinking-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:react-native-gradle-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-module-gradle-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-launcher-gradle-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-module-gradle-plugin:pluginDescriptors
> Task :expo-dev-launcher-gradle-plugin:pluginDescriptors
> Task :expo-module-gradle-plugin:processResources
> Task :expo-dev-launcher-gradle-plugin:processResources
> Task :expo-gradle-plugin:expo-autolinking-plugin:pluginDescriptors
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:pluginDescriptors
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:processResources
> Task :expo-gradle-plugin:expo-autolinking-plugin:processResources
> Task :gradle-plugin:react-native-gradle-plugin:pluginDescriptors
> Task :gradle-plugin:react-native-gradle-plugin:processResources
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:compileKotlin
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:classes
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:jar
> Task :expo-gradle-plugin:expo-autolinking-plugin:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-plugin:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin:classes
> Task :expo-gradle-plugin:expo-autolinking-plugin:jar
> Task :gradle-plugin:react-native-gradle-plugin:compileKotlin
> Task :gradle-plugin:react-native-gradle-plugin:compileJava NO-SOURCE
> Task :gradle-plugin:react-native-gradle-plugin:classes
> Task :gradle-plugin:react-native-gradle-plugin:jar
> Task :expo-dev-launcher-gradle-plugin:compileKotlin
> Task :expo-dev-launcher-gradle-plugin:compileJava NO-SOURCE
> Task :expo-dev-launcher-gradle-plugin:classes
> Task :expo-dev-launcher-gradle-plugin:jar
> Task :expo-module-gradle-plugin:compileKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/expo-module-gradle-plugin/src/main/kotlin/expo/modules/plugin/android/AndroidLibraryExtension.kt:9:24 'var targetSdk: Int?' is deprecated. Will be removed from library DSL in v9.0. Use testOptions.targetSdk or/and lint.targetSdk instead.
> Task :expo-module-gradle-plugin:compileJava NO-SOURCE
> Task :expo-module-gradle-plugin:classes
> Task :expo-module-gradle-plugin:jar
> Configure project :
[ExpoRootProject] Using the following versions:
  - buildTools:  36.0.0
  - minSdk:      24
  - compileSdk:  36
  - targetSdk:   36
  - ndk:         27.1.12297006
  - kotlin:      2.1.20
  - ksp:         2.1.20-2.0.1
> Configure project :app
ℹ️  Applying gradle plugin 'expo-max-sdk-override-plugin'
[expo-max-sdk-override-plugin] This plugin will find all permissions declared with `android:maxSdkVersion`. If there exists a declaration with the `android:maxSdkVersion` annotation and another one without, the plugin will remove the annotation from the final merged manifest. In order to see a log with the changes run a clean build of the app.
 ℹ️  Applying gradle plugin 'expo-dev-launcher-gradle-plugin'
> Configure project :expo
Using expo modules
  - expo-log-box (55.0.7)
  - expo-constants (55.0.7)
  - expo-dev-client (55.0.16)
  - expo-dev-launcher (55.0.17)
- expo-dev-menu (55.0.14)
- expo-dev-menu-interface (55.0.1)
- expo-json-utils (55.0.0)
- expo-manifests (55.0.9)
> Configure project :expo-modules-core
Linking react-native-worklets native libs into expo-modules-core build tasks
task ':react-native-worklets:mergeDebugNativeLibs'
task ':react-native-worklets:mergeReleaseNativeLibs'
> Configure project :expo
  - expo-modules-core (55.0.14)
- expo-updates-interface (55.1.3)
- [📦] expo-dom-webview (55.0.3)
  - [📦] expo-application (55.0.9)
  - [📦] expo-asset (55.0.8)
  - [📦] expo-crypto (55.0.9)
  - [📦] expo-device (55.0.9)
  - [📦] expo-file-system (55.0.10)
  - [📦] expo-font (55.0.4)
  - [📦] expo-image (55.0.6)
  - [📦] expo-keep-awake (55.0.4)
  - [📦] expo-linear-gradient (55.0.8)
  - [📦] expo-linking (55.0.7)
  - [📦] expo-router (55.0.4)
  - [📦] expo-secure-store (55.0.8)
  - [📦] expo-splash-screen (55.0.10)
  - [📦] expo-system-ui (55.0.9)
  - [📦] expo-web-browser (55.0.9)
> Task :expo-json-utils:preBuild
UP-TO-DATE
> Task :expo-dev-client:preBuild UP-TO-DATE
> Task :expo-dev-menu:preBuild UP-TO-DATE
> Task :expo-dev-menu-interface:preBuild UP-TO-DATE
> Task :expo-dev-launcher:preBuild UP-TO-DATE
> Task :expo-manifests:preBuild UP-TO-DATE
> Task :expo-log-box:preBuild UP-TO-DATE
> Task :expo-modules-core:preBuild UP-TO-DATE
> Task :expo-updates-interface:preBuild UP-TO-DATE
> Task :expo:generatePackagesList
> Task :expo:preBuild
> Task :app:copySentryJsonConfiguration
sentry.options.json not found in app root (/home/expo/workingdir/build)
> Task :app:generateAutolinkingNewArchitectureFiles
> Task :app:generateAutolinkingPackageList
> Task :app:generateCodegenSchemaFromJavaScript SKIPPED
> Task :app:generateCodegenArtifactsFromSchema SKIPPED
> Task :app:generateReactNativeEntryPoint
> Task :react-native-worklets:assertMinimalReactNativeVersionTask
> Task :react-native-worklets:assertNewArchitectureEnabledTask SKIPPED
> Task :react-native-reanimated:assertMinimalReactNativeVersionTask
> Task :react-native-reanimated:assertNewArchitectureEnabledTask SKIPPED
> Task :expo-constants:createExpoConfig
> Task :expo-constants:preBuild
> Task :expo:preReleaseBuild
> Task :react-native-reanimated:assertWorkletsVersionTask
The NODE_ENV environment variable is required but was not specified. Ensure the project is bundled with Expo CLI or NODE_ENV is set. Using only .env.local and .env
> Task :react-native-gesture-handler:generateCodegenSchemaFromJavaScript
> Task :expo:mergeReleaseJniLibFolders
> Task :react-native-keyboard-controller:generateCodegenSchemaFromJavaScript
> Task :expo:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-safe-area-context:generateCodegenSchemaFromJavaScript
> Task :react-native-screens:generateCodegenSchemaFromJavaScript
> Task :react-native-worklets:generateCodegenSchemaFromJavaScript
> Task :expo:copyReleaseJniLibsProjectOnly
> Task :expo-constants:preReleaseBuild
> Task :sentry_react-native:generateCodegenSchemaFromJavaScript
> Task :expo-constants:mergeReleaseJniLibFolders
> Task :expo-constants:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-constants:copyReleaseJniLibsProjectOnly
> Task :expo-dev-client:preReleaseBuild UP-TO-DATE
> Task :expo-dev-client:mergeReleaseJniLibFolders
> Task :expo-dev-client:mergeReleaseNativeLibs
NO-SOURCE
> Task :expo-dev-client:copyReleaseJniLibsProjectOnly
> Task :expo-dev-launcher:preReleaseBuild
UP-TO-DATE
> Task :expo-dev-launcher:mergeReleaseJniLibFolders
> Task :expo-dev-launcher:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-reanimated:generateCodegenSchemaFromJavaScript
> Task :expo-dev-launcher:copyReleaseJniLibsProjectOnly
> Task :expo-dev-menu:preReleaseBuild UP-TO-DATE
> Task :expo-dev-menu:mergeReleaseJniLibFolders
> Task :expo-dev-menu:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-dev-menu:copyReleaseJniLibsProjectOnly
> Task :expo-dev-menu-interface:preReleaseBuild UP-TO-DATE
> Task :expo-dev-menu-interface:mergeReleaseJniLibFolders
> Task :expo-dev-menu-interface:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-dev-menu-interface:copyReleaseJniLibsProjectOnly
> Task :expo-json-utils:preReleaseBuild UP-TO-DATE
> Task :expo-json-utils:mergeReleaseJniLibFolders
> Task :expo-json-utils:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-reanimated:generateCodegenArtifactsFromSchema
> Task :expo-json-utils:copyReleaseJniLibsProjectOnly
> Task :expo-log-box:preReleaseBuild UP-TO-DATE
> Task :sentry_react-native:generateCodegenArtifactsFromSchema
> Task :react-native-safe-area-context:generateCodegenArtifactsFromSchema
> Task :react-native-keyboard-controller:generateCodegenArtifactsFromSchema
> Task :sentry_react-native:preBuild
> Task :expo-manifests:preReleaseBuild UP-TO-DATE
> Task :react-native-keyboard-controller:preBuild
> Task :react-native-gesture-handler:generateCodegenArtifactsFromSchema
> Task :expo-modules-core:preReleaseBuild UP-TO-DATE
> Task :react-native-gesture-handler:preBuild
> Task :react-native-safe-area-context:preBuild
> Task :react-native-gesture-handler:preReleaseBuild
> Task :expo-updates-interface:preReleaseBuild UP-TO-DATE
> Task :react-native-worklets:generateCodegenArtifactsFromSchema
> Task :expo-log-box:mergeReleaseJniLibFolders
> Task :expo-log-box:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-updates-interface:mergeReleaseJniLibFolders
> Task :react-native-gesture-handler:mergeReleaseJniLibFolders
> Task :react-native-keyboard-controller:preReleaseBuild
> Task :expo-manifests:mergeReleaseJniLibFolders
> Task :expo-updates-interface:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-manifests:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-screens:generateCodegenArtifactsFromSchema
> Task :expo-modules-core:mergeReleaseJniLibFolders
> Task :expo-log-box:copyReleaseJniLibsProjectOnly
> Task :expo-updates-interface:copyReleaseJniLibsProjectOnly
> Task :sentry_react-native:preReleaseBuild
> Task :react-native-gesture-handler:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-safe-area-context:preReleaseBuild
> Task :react-native-keyboard-controller:mergeReleaseJniLibFolders
> Task :react-native-screens:preBuild
> Task :expo-manifests:copyReleaseJniLibsProjectOnly
> Task :react-native-screens:preReleaseBuild
> Task :expo:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-keyboard-controller:mergeReleaseNativeLibs NO-SOURCE
> Task :sentry_react-native:mergeReleaseJniLibFolders
> Task :react-native-safe-area-context:mergeReleaseJniLibFolders
> Task :sentry_react-native:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-keyboard-controller:copyReleaseJniLibsProjectOnly
> Task :react-native-keyboard-controller:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-safe-area-context:mergeReleaseNativeLibs NO-SOURCE
> Task :expo:generateReleaseBuildConfig
> Task :react-native-gesture-handler:generateReleaseBuildConfig
> Task :react-native-safe-area-context:copyReleaseJniLibsProjectOnly
> Task :sentry_react-native:copyReleaseJniLibsProjectOnly
> Task :react-native-worklets:prepareWorkletsHeadersForPrefabs
> Task :expo:generateReleaseResValues
> Task :react-native-safe-area-context:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-worklets:preBuild
> Task :react-native-worklets:preReleaseBuild
> Task :react-native-safe-area-context:generateReleaseBuildConfig
> Task :sentry_react-native:generateReleaseBuildConfig
> Task :expo:generateReleaseResources
> Task :react-native-gesture-handler:generateReleaseResValues
> Task :react-native-keyboard-controller:generateReleaseBuildConfig
> Task :react-native-safe-area-context:generateReleaseResValues
> Task :sentry_react-native:generateReleaseResValues
> Task :react-native-keyboard-controller:generateReleaseResValues
> Task :sentry_react-native:generateReleaseResources
> Task :react-native-safe-area-context:generateReleaseResources
> Task :react-native-gesture-handler:generateReleaseResources
> Task :react-native-keyboard-controller:generateReleaseResources
> Task :react-native-gesture-handler:packageReleaseResources
> Task :expo:packageReleaseResources
> Task :react-native-reanimated:prepareReanimatedHeadersForPrefabs
> Task :react-native-safe-area-context:packageReleaseResources
> Task :sentry_react-native:packageReleaseResources
> Task :react-native-reanimated:preBuild
> Task :react-native-reanimated:preReleaseBuild
> Task :app:preBuild
> Task :app:preReleaseBuild
> Task :react-native-reanimated:mergeReleaseJniLibFolders
> Task :app:mergeReleaseJniLibFolders
> Task :react-native-reanimated:generateReleaseBuildConfig
> Task :react-native-reanimated:generateReleaseResValues
> Task :react-native-reanimated:generateReleaseResources
> Task :react-native-reanimated:packageReleaseResources
> Task :react-native-keyboard-controller:packageReleaseResources
> Task :react-native-reanimated:parseReleaseLocalResources
> Task :react-native-safe-area-context:parseReleaseLocalResources
> Task :react-native-gesture-handler:parseReleaseLocalResources
> Task :sentry_react-native:parseReleaseLocalResources
> Task :expo:parseReleaseLocalResources
> Task :react-native-keyboard-controller:javaPreCompileRelease
> Task :react-native-keyboard-controller:parseReleaseLocalResources
> Task :react-native-safe-area-context:generateReleaseRFile
> Task :expo:generateReleaseRFile
> Task :sentry_react-native:generateReleaseRFile
> Task :react-native-keyboard-controller:generateReleaseRFile
> Task :react-native-gesture-handler:generateReleaseRFile
> Task :react-native-reanimated:generateReleaseRFile
> Task :expo-constants:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-reanimated:javaPreCompileRelease
> Task :sentry_react-native:javaPreCompileRelease
> Task :expo-modules-core:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-constants:generateReleaseBuildConfig
> Task :react-native-gesture-handler:javaPreCompileRelease
> Task :expo-dev-client:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-constants:generateReleaseResValues
> Task :expo-constants:generateReleaseResources
> Task :expo-modules-core:generateReleaseBuildConfig
> Task :expo-modules-core:generateReleaseResValues
> Task :expo-modules-core:generateReleaseResources
> Task :expo-constants:packageReleaseResources
> Task :expo-modules-core:packageReleaseResources
> Task :expo-constants:parseReleaseLocalResources
> Task :expo-constants:generateReleaseRFile
> Task :react-native-screens:configureCMakeRelWithDebInfo[arm64-v8a]
Checking the license for package CMake 3.22.1 in /home/expo/Android/Sdk/licenses
License for package CMake 3.22.1 accepted.
Preparing "Install CMake 3.22.1 v.3.22.1".
> Task :expo-modules-core:javaPreCompileRelease
> Task :expo-modules-core:parseReleaseLocalResources
> Task :expo-constants:javaPreCompileRelease
> Task :expo-modules-core:generateReleaseRFile
> Task :expo-dev-client:dataBindingMergeDependencyArtifactsRelease
> Task :expo-dev-launcher:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-menu:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-client:generateReleaseResValues
> Task :expo-dev-menu:generateReleaseBuildConfig
> Task :expo-dev-client:generateReleaseResources
> Task :expo-dev-menu:generateReleaseResValues
> Task :expo-dev-menu:generateReleaseResources
> Task :expo-dev-menu:packageReleaseResources
> Task :expo-dev-client:packageReleaseResources
> Task :expo-dev-menu:parseReleaseLocalResources
> Task :expo-dev-client:generateReleaseBuildConfig
> Task :expo-dev-client:parseReleaseLocalResources
> Task :expo-dev-client:dataBindingGenBaseClassesRelease
> Task :react-native-screens:configureCMakeRelWithDebInfo[arm64-v8a]
"Install CMake 3.22.1 v.3.22.1" ready.
Installing CMake 3.22.1 in /home/expo/Android/Sdk/cmake/3.22.1
"Install CMake 3.22.1 v.3.22.1" complete.
"Install CMake 3.22.1 v.3.22.1" finished.
> Task :expo-dev-client:generateReleaseRFile
> Task :expo-dev-menu:generateReleaseRFile
> Task :expo-dev-menu:javaPreCompileRelease
> Task :expo-dev-client:javaPreCompileRelease
> Task :expo-dev-menu-interface:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-menu-interface:generateReleaseBuildConfig
> Task :react-native-safe-area-context:javaPreCompileRelease
> Task :expo-json-utils:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-dev-menu-interface:generateReleaseResValues
> Task :expo-json-utils:generateReleaseBuildConfig
> Task :expo-dev-menu-interface:generateReleaseResources
> Task :expo-json-utils:generateReleaseResValues
> Task :expo-json-utils:generateReleaseResources
> Task :expo-dev-menu-interface:packageReleaseResources
> Task :expo-json-utils:packageReleaseResources
> Task :expo-json-utils:parseReleaseLocalResources
> Task :expo-dev-menu-interface:parseReleaseLocalResources
> Task :expo-dev-menu-interface:generateReleaseRFile
> Task :expo-dev-menu-interface:javaPreCompileRelease
> Task :expo-json-utils:generateReleaseRFile
> Task :expo-log-box:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-log-box:generateReleaseBuildConfig
> Task :expo-log-box:generateReleaseResValues
> Task :expo-log-box:generateReleaseResources
> Task :expo-log-box:packageReleaseResources
> Task :expo-json-utils:javaPreCompileRelease
> Task :expo-log-box:parseReleaseLocalResources
> Task :expo-log-box:javaPreCompileRelease
> Task :expo-manifests:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-manifests:generateReleaseBuildConfig
> Task :expo-manifests:generateReleaseResValues
> Task :expo-manifests:generateReleaseResources
> Task :expo-manifests:packageReleaseResources
> Task :expo-manifests:parseReleaseLocalResources
> Task :expo-log-box:generateReleaseRFile
> Task :expo-manifests:generateReleaseRFile
> Task :expo-updates-interface:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-updates-interface:generateReleaseBuildConfig
> Task :expo-updates-interface:generateReleaseResValues
> Task :expo-updates-interface:generateReleaseResources
> Task :expo-updates-interface:packageReleaseResources
> Task :expo-manifests:javaPreCompileRelease
> Task :expo-updates-interface:parseReleaseLocalResources
> Task :expo-updates-interface:javaPreCompileRelease
> Task :expo-updates-interface:generateReleaseRFile
> Task :expo:javaPreCompileRelease
> Task :react-native-safe-area-context:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:9:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:50:54 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:59:23 'val uiImplementation: UIImplementation!' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewShadowNode.kt:9:32 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewShadowNode.kt:110:61 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
> Task :sentry_react-native:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :react-native-keyboard-controller:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/fabric/java/com/reactnativekeyboardcontroller/OverKeyboardViewManager.kt:3:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/fabric/java/com/reactnativekeyboardcontroller/OverKeyboardViewManager.kt:29:44 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/fabric/java/com/reactnativekeyboardcontroller/OverKeyboardViewManager.kt:31:48 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/extensions/EditText.kt:69:42 Unchecked cast of 'ArrayList<*>' to 'ArrayList<TextWatcher>'.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/interactive/KeyboardAnimationController.kt:89:16 'static fun getWindowInsetsController(p0: View): WindowInsetsControllerCompat?' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:4:8 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:69:7 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:71:9 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:73:9 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:75:9 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:77:9 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:79:9 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:81:9 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/managers/KeyboardControllerViewManagerImpl.kt:83:9 'object MapBuilder : Any' is deprecated. Use Kotlin's built-in collections extensions.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/modal/ModalAttachedWatcher.kt:29:111 'val DEFAULT: Int' is deprecated. UIManagerType.DEFAULT will be deleted in the next release of React Native. Use [LEGACY] instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/modules/statusbar/StatusBarManagerCompatModuleImpl.kt:70:38 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/modules/statusbar/StatusBarManagerCompatModuleImpl.kt:73:20 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/modules/statusbar/StatusBarManagerCompatModuleImpl.kt:78:18 'var statusBarColor: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/EdgeToEdgeReactViewGroup.kt:152:83 'static field FLAG_FULLSCREEN: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardHostShadowNode.kt:3:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardHostShadowNode.kt:4:8 'class ReactShadowNodeImpl : Any, ReactShadowNode<ReactShadowNodeImpl!>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardHostShadowNode.kt:15:45 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardHostShadowNode.kt:22:12 'class ReactShadowNodeImpl : Any, ReactShadowNode<ReactShadowNodeImpl!>' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:13:8 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:79:5 The corresponding parameter in the supertype 'ReactViewGroup' is named 'left'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:80:5 The corresponding parameter in the supertype 'ReactViewGroup' is named 'top'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:81:5 The corresponding parameter in the supertype 'ReactViewGroup' is named 'right'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:82:5 The corresponding parameter in the supertype 'ReactViewGroup' is named 'bottom'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:132:9 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:152:5 The corresponding parameter in the supertype 'ReactViewGroup' is named 'w'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:153:5 The corresponding parameter in the supertype 'ReactViewGroup' is named 'h'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:154:5 The corresponding parameter in the supertype 'ReactViewGroup' is named 'oldw'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/java/com/reactnativekeyboardcontroller/views/overlay/OverKeyboardViewGroup.kt:155:5 The corresponding parameter in the supertype 'ReactViewGroup' is named 'oldh'. This may cause problems when calling this function with named arguments.
> Task :expo:writeReleaseAarMetadata
> Task :expo-constants:writeReleaseAarMetadata
> Task :expo-dev-client:writeReleaseAarMetadata
> Task :expo-dev-menu:writeReleaseAarMetadata
> Task :expo-dev-menu-interface:writeReleaseAarMetadata
> Task :expo-json-utils:writeReleaseAarMetadata
> Task :expo-log-box:writeReleaseAarMetadata
> Task :expo-manifests:writeReleaseAarMetadata
> Task :expo-modules-core:writeReleaseAarMetadata
> Task :expo-updates-interface:writeReleaseAarMetadata
> Task :react-native-gesture-handler:writeReleaseAarMetadata
> Task :react-native-reanimated:writeReleaseAarMetadata
> Task :expo:extractDeepLinksRelease
> Task :expo:processReleaseManifest
> Task :expo-constants:extractDeepLinksRelease
> Task :expo-constants:processReleaseManifest
> Task :expo-dev-client:extractDeepLinksRelease
> Task :expo-dev-client:processReleaseManifest
> Task :expo-dev-menu:extractDeepLinksRelease
> Task :expo-dev-menu:processReleaseManifest
> Task :expo-dev-menu-interface:extractDeepLinksRelease
> Task :expo-dev-menu-interface:processReleaseManifest
> Task :expo-json-utils:extractDeepLinksRelease
> Task :expo-json-utils:processReleaseManifest
> Task :expo-log-box:extractDeepLinksRelease
> Task :expo-log-box:processReleaseManifest
> Task :expo-manifests:extractDeepLinksRelease
> Task :expo-manifests:processReleaseManifest
> Task :expo-modules-core:extractDeepLinksRelease
> Task :expo-modules-core:processReleaseManifest
/home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/AndroidManifest.xml:8:9-11:45 Warning:
	meta-data#com.facebook.soloader.enabled@android:value was tagged at AndroidManifest.xml:8 to replace other declarations but no other declaration present
> Task :expo-updates-interface:extractDeepLinksRelease
> Task :expo-updates-interface:processReleaseManifest
> Task :react-native-gesture-handler:extractDeepLinksRelease
> Task :react-native-gesture-handler:processReleaseManifest
> Task :app:checkReleaseDuplicateClasses
> Task :react-native-reanimated:extractDeepLinksRelease
> Task :react-native-reanimated:processReleaseManifest
> Task :app:buildKotlinToolingMetadata
> Task :app:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :app:generateReleaseBuildConfig
> Task :expo-dev-launcher:dataBindingMergeDependencyArtifactsRelease
> Task :expo-dev-launcher:generateReleaseResValues
> Task :expo-dev-launcher:generateReleaseResources
> Task :expo-dev-launcher:packageReleaseResources
> Task :expo-dev-launcher:parseReleaseLocalResources
> Task :expo:compileReleaseLibraryResources
> Task :expo-constants:compileReleaseLibraryResources
> Task :expo-dev-client:compileReleaseLibraryResources
> Task :expo-dev-menu:compileReleaseLibraryResources
> Task :expo-dev-menu-interface:compileReleaseLibraryResources
> Task :expo-json-utils:compileReleaseLibraryResources
> Task :expo-dev-launcher:dataBindingGenBaseClassesRelease
> Task :expo-log-box:compileReleaseLibraryResources
> Task :expo-dev-launcher:generateReleaseBuildConfig
> Task :expo-manifests:compileReleaseLibraryResources
> Task :expo-dev-launcher:javaPreCompileRelease
> Task :expo-dev-launcher:generateReleaseRFile
> Task :expo-dev-launcher:writeReleaseAarMetadata
> Task :expo-dev-launcher:extractDeepLinksRelease
> Task :expo-modules-core:compileReleaseLibraryResources
> Task :expo-dev-launcher:processReleaseManifest
> Task :expo-dev-launcher:compileReleaseLibraryResources
> Task :expo-updates-interface:compileReleaseLibraryResources
> Task :react-native-gesture-handler:compileReleaseLibraryResources
> Task :expo:prepareReleaseArtProfile
> Task :react-native-reanimated:compileReleaseLibraryResources
> Task :expo-dev-client:prepareReleaseArtProfile
> Task :expo-constants:prepareReleaseArtProfile
> Task :expo-dev-launcher:prepareReleaseArtProfile
> Task :expo-dev-menu:prepareReleaseArtProfile
> Task :expo-dev-menu-interface:prepareReleaseArtProfile
> Task :expo-json-utils:prepareReleaseArtProfile
> Task :expo-manifests:prepareReleaseArtProfile
> Task :expo-log-box:prepareReleaseArtProfile
> Task :expo-modules-core:prepareReleaseArtProfile
> Task :expo-updates-interface:prepareReleaseArtProfile
> Task :react-native-reanimated:prepareReleaseArtProfile
> Task :react-native-gesture-handler:prepareReleaseArtProfile
> Task :expo:mergeReleaseShaders
> Task :expo-constants:mergeReleaseShaders
> Task :expo-constants:compileReleaseShaders NO-SOURCE
> Task :expo:compileReleaseShaders NO-SOURCE
> Task :expo:generateReleaseAssets UP-TO-DATE
> Task :expo-constants:generateReleaseAssets UP-TO-DATE
> Task :expo:mergeReleaseAssets
> Task :expo-dev-client:mergeReleaseShaders
> Task :expo-constants:mergeReleaseAssets
> Task :expo-dev-client:compileReleaseShaders NO-SOURCE
> Task :expo-dev-client:generateReleaseAssets UP-TO-DATE
> Task :expo-dev-launcher:mergeReleaseShaders
> Task :expo-dev-client:mergeReleaseAssets
> Task :expo-dev-launcher:compileReleaseShaders NO-SOURCE
> Task :expo-dev-launcher:generateReleaseAssets UP-TO-DATE
> Task :expo-dev-launcher:mergeReleaseAssets
> Task :expo-dev-menu:mergeReleaseShaders
> Task :expo-dev-menu:compileReleaseShaders NO-SOURCE
> Task :expo-dev-menu:generateReleaseAssets UP-TO-DATE
> Task :expo-dev-menu-interface:mergeReleaseShaders
> Task :expo-dev-menu:mergeReleaseAssets
> Task :expo-dev-menu-interface:compileReleaseShaders NO-SOURCE
> Task :expo-dev-menu-interface:generateReleaseAssets UP-TO-DATE
> Task :expo-json-utils:mergeReleaseShaders
> Task :expo-dev-menu-interface:mergeReleaseAssets
> Task :expo-json-utils:compileReleaseShaders NO-SOURCE
> Task :expo-json-utils:generateReleaseAssets UP-TO-DATE
> Task :expo-log-box:mergeReleaseShaders
> Task :expo-json-utils:mergeReleaseAssets
> Task :expo-log-box:compileReleaseShaders NO-SOURCE
> Task :expo-log-box:generateReleaseAssets UP-TO-DATE
> Task :expo-manifests:mergeReleaseShaders
> Task :expo-manifests:compileReleaseShaders NO-SOURCE
> Task :expo-manifests:generateReleaseAssets UP-TO-DATE
> Task :expo-log-box:mergeReleaseAssets
> Task :expo-manifests:mergeReleaseAssets
> Task :expo-modules-core:mergeReleaseShaders
> Task :expo-modules-core:compileReleaseShaders NO-SOURCE
> Task :expo-modules-core:generateReleaseAssets UP-TO-DATE
> Task :expo-updates-interface:mergeReleaseShaders
> Task :expo-updates-interface:compileReleaseShaders NO-SOURCE
> Task :expo-modules-core:mergeReleaseAssets
> Task :expo-updates-interface:generateReleaseAssets UP-TO-DATE
> Task :react-native-gesture-handler:mergeReleaseShaders
> Task :expo-updates-interface:mergeReleaseAssets
> Task :react-native-gesture-handler:compileReleaseShaders NO-SOURCE
> Task :react-native-gesture-handler:generateReleaseAssets UP-TO-DATE
> Task :react-native-gesture-handler:mergeReleaseAssets
> Task :react-native-reanimated:mergeReleaseShaders
> Task :react-native-reanimated:compileReleaseShaders NO-SOURCE
> Task :react-native-reanimated:generateReleaseAssets UP-TO-DATE
> Task :react-native-reanimated:mergeReleaseAssets
> Task :expo-constants:extractProguardFiles
> Task :expo:extractProguardFiles
> Task :expo-modules-core:extractProguardFiles
> Task :expo-constants:prepareLintJarForPublish
> Task :expo-modules-core:prepareLintJarForPublish
> Task :expo-dev-client:extractProguardFiles
> Task :expo-dev-launcher:extractProguardFiles
> Task :expo-dev-client:prepareLintJarForPublish
> Task :expo-dev-launcher:prepareLintJarForPublish
> Task :expo-dev-menu-interface:extractProguardFiles
> Task :expo-dev-menu:extractProguardFiles
> Task :expo-dev-menu:prepareLintJarForPublish
> Task :expo-dev-menu-interface:prepareLintJarForPublish
> Task :expo-json-utils:extractProguardFiles
> Task :expo-log-box:extractProguardFiles
> Task :expo-json-utils:prepareLintJarForPublish
> Task :expo-log-box:prepareLintJarForPublish
> Task :expo-updates-interface:extractProguardFiles
> Task :expo-manifests:extractProguardFiles
> Task :expo-updates-interface:prepareLintJarForPublish
> Task :expo-manifests:prepareLintJarForPublish
> Task :expo:prepareLintJarForPublish
> Task :react-native-gesture-handler:extractProguardFiles
> Task :react-native-reanimated:processReleaseJavaRes NO-SOURCE
> Task :react-native-gesture-handler:prepareLintJarForPublish
> Task :react-native-reanimated:extractProguardFiles
> Task :react-native-gesture-handler:extractDeepLinksForAarRelease
> Task :react-native-reanimated:prepareLintJarForPublish
> Task :react-native-reanimated:extractDeepLinksForAarRelease
> Task :expo:stripReleaseDebugSymbols NO-SOURCE
> Task :expo:copyReleaseJniLibsProjectAndLocalJars
> Task :expo:extractDeepLinksForAarRelease
> Task :expo-modules-core:extractDeepLinksForAarRelease
> Task :expo-log-box:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-log-box:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-log-box:extractDeepLinksForAarRelease
> Task :expo-dev-launcher:stripReleaseDebugSymbols NO-SOURCE
> Task :react-native-safe-area-context:compileReleaseJavaWithJavac
> Task :react-native-keyboard-controller:compileReleaseJavaWithJavac
> Task :expo-dev-launcher:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-dev-launcher:extractDeepLinksForAarRelease
> Task :expo-dev-menu-interface:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-dev-menu-interface:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-dev-menu-interface:extractDeepLinksForAarRelease
> Task :react-native-keyboard-controller:writeReleaseAarMetadata
> Task :react-native-safe-area-context:writeReleaseAarMetadata
> Task :sentry_react-native:writeReleaseAarMetadata
> Task :react-native-keyboard-controller:extractDeepLinksRelease
> Task :react-native-safe-area-context:bundleLibRuntimeToDirRelease
> Task :sentry_react-native:bundleLibRuntimeToDirRelease
> Task :react-native-keyboard-controller:processReleaseManifest
package="com.reactnativekeyboardcontroller" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.reactnativekeyboardcontroller" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-keyboard-controller/android/src/main/AndroidManifest.xml.
> Task :react-native-reanimated:mergeReleaseJavaResource
> Task :react-native-safe-area-context:extractDeepLinksRelease
> Task :sentry_react-native:extractDeepLinksRelease
> Task :react-native-keyboard-controller:bundleLibRuntimeToDirRelease
> Task :react-native-safe-area-context:processReleaseManifest
package="com.th3rdwave.safeareacontext" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.th3rdwave.safeareacontext" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
> Task :sentry_react-native:processReleaseManifest
package="io.sentry.react" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/@sentry/react-native/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="io.sentry.react" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/@sentry/react-native/android/src/main/AndroidManifest.xml.
> Task :react-native-keyboard-controller:compileReleaseLibraryResources
> Task :react-native-safe-area-context:compileReleaseLibraryResources
> Task :sentry_react-native:compileReleaseLibraryResources
> Task :react-native-safe-area-context:bundleLibCompileToJarRelease
> Task :react-native-keyboard-controller:bundleLibCompileToJarRelease
> Task :react-native-keyboard-controller:prepareReleaseArtProfile
> Task :react-native-safe-area-context:prepareReleaseArtProfile
> Task :sentry_react-native:bundleLibCompileToJarRelease
> Task :sentry_react-native:prepareReleaseArtProfile
> Task :react-native-safe-area-context:bundleLibRuntimeToJarRelease
> Task :react-native-keyboard-controller:bundleLibRuntimeToJarRelease
> Task :react-native-worklets:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :app:createBundleReleaseJsAndAssets
Using src/app as the root directory for Expo Router.
React Compiler enabled
Starting Metro Bundler
> Task :sentry_react-native:bundleLibRuntimeToJarRelease
> Task :react-native-keyboard-controller:mergeReleaseShaders
> Task :react-native-keyboard-controller:compileReleaseShaders NO-SOURCE
> Task :react-native-keyboard-controller:generateReleaseAssets UP-TO-DATE
> Task :react-native-keyboard-controller:mergeReleaseAssets
> Task :react-native-safe-area-context:mergeReleaseShaders
> Task :react-native-safe-area-context:compileReleaseShaders NO-SOURCE
> Task :react-native-safe-area-context:generateReleaseAssets UP-TO-DATE
> Task :react-native-safe-area-context:mergeReleaseAssets
> Task :sentry_react-native:mergeReleaseShaders
> Task :sentry_react-native:compileReleaseShaders NO-SOURCE
> Task :sentry_react-native:generateReleaseAssets UP-TO-DATE
> Task :sentry_react-native:mergeReleaseAssets
> Task :react-native-keyboard-controller:processReleaseJavaRes
> Task :react-native-keyboard-controller:createFullJarRelease
> Task :react-native-keyboard-controller:extractProguardFiles
> Task :app:createBundleReleaseJsAndAssets
Android node_modules/expo-router/entry.js ░░░░░░░░░░░░░░░░  0.0% (0/1)
> Task :react-native-safe-area-context:processReleaseJavaRes
> Task :react-native-safe-area-context:createFullJarRelease
> Task :react-native-safe-area-context:extractProguardFiles
> Task :sentry_react-native:processReleaseJavaRes NO-SOURCE
> Task :sentry_react-native:createFullJarRelease
> Task :expo-constants:stripReleaseDebugSymbols NO-SOURCE
> Task :sentry_react-native:extractProguardFiles
> Task :expo-constants:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-constants:extractDeepLinksForAarRelease
> Task :expo-dev-client:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-dev-client:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-dev-client:extractDeepLinksForAarRelease
> Task :expo-dev-menu:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-dev-menu:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-dev-menu:extractDeepLinksForAarRelease
> Task :expo-manifests:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-manifests:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-manifests:extractDeepLinksForAarRelease
> Task :expo-json-utils:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-json-utils:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-json-utils:extractDeepLinksForAarRelease
> Task :expo-updates-interface:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-updates-interface:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-updates-interface:extractDeepLinksForAarRelease
> Task :expo-constants:writeReleaseLintModelMetadata
> Task :expo-dev-client:writeReleaseLintModelMetadata
> Task :expo-dev-launcher:writeReleaseLintModelMetadata
> Task :expo-dev-menu:writeReleaseLintModelMetadata
> Task :expo-dev-menu-interface:writeReleaseLintModelMetadata
> Task :expo-json-utils:writeReleaseLintModelMetadata
> Task :expo-manifests:writeReleaseLintModelMetadata
> Task :expo-log-box:writeReleaseLintModelMetadata
> Task :expo-modules-core:writeReleaseLintModelMetadata
> Task :expo-updates-interface:writeReleaseLintModelMetadata
> Task :expo:writeReleaseLintModelMetadata
> Task :react-native-reanimated:writeReleaseLintModelMetadata
> Task :react-native-gesture-handler:writeReleaseLintModelMetadata
> Task :app:createBundleReleaseJsAndAssets
Android node_modules/expo-router/entry.js ▓▓▓░░░░░░░░░░░░░ 19.2% (206/470)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░ 89.2% (1661/1759)
> Task :react-native-screens:buildCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-keyboard-controller:generateReleaseLintModel
> Task :react-native-safe-area-context:generateReleaseLintModel
> Task :react-native-keyboard-controller:prepareLintJarForPublish
> Task :react-native-keyboard-controller:stripReleaseDebugSymbols NO-SOURCE
> Task :react-native-safe-area-context:prepareLintJarForPublish
> Task :react-native-safe-area-context:stripReleaseDebugSymbols NO-SOURCE
> Task :react-native-keyboard-controller:copyReleaseJniLibsProjectAndLocalJars
> Task :react-native-keyboard-controller:extractDeepLinksForAarRelease
> Task :react-native-safe-area-context:extractDeepLinksForAarRelease
> Task :react-native-safe-area-context:copyReleaseJniLibsProjectAndLocalJars
> Task :app:createBundleReleaseJsAndAssets
Android Bundled 10259ms node_modules/expo-router/entry.js (1927 modules)
Exporting server
> Task :sentry_react-native:generateReleaseLintModel
> Task :sentry_react-native:stripReleaseDebugSymbols NO-SOURCE
> Task :sentry_react-native:copyReleaseJniLibsProjectAndLocalJars
> Task :sentry_react-native:prepareLintJarForPublish
> Task :sentry_react-native:extractDeepLinksForAarRelease
> Task :react-native-screens:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :app:createBundleReleaseJsAndAssets
λ node_modules/expo/node_modules/@expo/cli/node_modules/@expo/router-server/build/static/getServerManifest.js ▓▓▓▓▓▓░░░░░░░░░░ 42.1% (629/969)
λ Bundled 5669ms node_modules/expo/node_modules/@expo/cli/node_modules/@expo/router-server/build/static/getServerManifest.js (1658 modules)
λ src/app/api/items/index+api.ts ░░░░░░░░░░░░░░░░  0.0% (0/1)
λ Bundled 1185ms src/app/api/items/index+api.ts (106 modules)
λ Bundled 1111ms src/app/api/items/clear-purchased+api.ts (111 modules)
> Task :react-native-screens:buildCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-safe-area-context:extractReleaseAnnotations
> Task :react-native-keyboard-controller:extractReleaseAnnotations
> Task :sentry_react-native:extractReleaseAnnotations
> Task :sentry_react-native:mergeReleaseGeneratedProguardFiles
> Task :react-native-keyboard-controller:mergeReleaseGeneratedProguardFiles
> Task :react-native-safe-area-context:mergeReleaseGeneratedProguardFiles
> Task :react-native-safe-area-context:mergeReleaseConsumerProguardFiles
> Task :sentry_react-native:mergeReleaseConsumerProguardFiles
> Task :react-native-keyboard-controller:mergeReleaseConsumerProguardFiles
> Task :sentry_react-native:mergeReleaseJavaResource
> Task :sentry_react-native:syncReleaseLibJars
> Task :sentry_react-native:bundleReleaseLocalLintAar
> Task :react-native-safe-area-context:mergeReleaseJavaResource
> Task :react-native-keyboard-controller:mergeReleaseJavaResource
> Task :react-native-keyboard-controller:writeReleaseLintModelMetadata
> Task :react-native-safe-area-context:syncReleaseLibJars
> Task :react-native-safe-area-context:bundleReleaseLocalLintAar
> Task :react-native-safe-area-context:writeReleaseLintModelMetadata
> Task :sentry_react-native:writeReleaseLintModelMetadata
> Task :react-native-keyboard-controller:syncReleaseLibJars
> Task :react-native-keyboard-controller:bundleReleaseLocalLintAar
> Task :react-native-safe-area-context:generateReleaseLintVitalModel
> Task :react-native-keyboard-controller:generateReleaseLintVitalModel
> Task :sentry_react-native:generateReleaseLintVitalModel
> Task :react-native-screens:configureCMakeRelWithDebInfo[x86]
> Task :react-native-worklets:buildCMakeRelWithDebInfo[arm64-v8a][worklets]
> Task :app:createBundleReleaseJsAndAssets
λ Bundled 884ms src/app/api/items/[id]+api.ts (1 module)
› Files (1):
_expo/routes.json (681B)
› API routes (3):
/api/items/[id] (598KB) (source map (687KB))
/api/items/index (599KB) (source map (687KB))
/api/items/clear-purchased (598KB) (source map (686KB))
Skipping server deployment because the script is not running in eager mode.
Writing bundle output to: /home/expo/workingdir/build/android/app/build/generated/assets/react/release/index.android.bundle
Writing sourcemap output to: /home/expo/workingdir/build/android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
Copying 54 asset files
Done writing bundle output
Done writing sourcemap output
> Task :react-native-worklets:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-screens:buildCMakeRelWithDebInfo[x86]
> Task :react-native-screens:configureCMakeRelWithDebInfo[x86_64]
> Task :sentry_react-native:lintVitalAnalyzeRelease
> Task :react-native-screens:buildCMakeRelWithDebInfo[x86_64]
> Task :react-native-screens:mergeReleaseJniLibFolders
> Task :react-native-screens:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-screens:generateReleaseBuildConfig
> Task :react-native-screens:generateReleaseResValues
> Task :react-native-screens:generateReleaseResources
> Task :react-native-screens:mergeReleaseNativeLibs
> Task :react-native-screens:packageReleaseResources
> Task :react-native-screens:writeReleaseAarMetadata
> Task :react-native-screens:javaPreCompileRelease
> Task :react-native-screens:extractDeepLinksRelease
> Task :react-native-screens:parseReleaseLocalResources
> Task :react-native-screens:copyReleaseJniLibsProjectOnly
> Task :react-native-screens:processReleaseManifest
> Task :react-native-screens:prepareReleaseArtProfile
> Task :react-native-screens:generateReleaseRFile
> Task :react-native-screens:mergeReleaseShaders
> Task :react-native-screens:compileReleaseLibraryResources
> Task :react-native-safe-area-context:lintVitalAnalyzeRelease
> Task :react-native-screens:compileReleaseShaders NO-SOURCE
> Task :react-native-screens:generateReleaseAssets UP-TO-DATE
> Task :react-native-screens:mergeReleaseAssets
> Task :react-native-screens:extractProguardFiles
> Task :react-native-screens:prepareLintJarForPublish
> Task :react-native-screens:extractDeepLinksForAarRelease
> Task :react-native-screens:writeReleaseLintModelMetadata
> Task :react-native-screens:stripReleaseDebugSymbols
> Task :react-native-screens:copyReleaseJniLibsProjectAndLocalJars
> Task :react-native-worklets:buildCMakeRelWithDebInfo[armeabi-v7a][worklets]
> Task :app:createBundleReleaseJsAndAssets_SentryUpload_com.pixa.grocify@1.0.0+1_1 FAILED
Copy `debugId` from packager source map to Hermes source map...
Done.
Check generated source map for Debug ID: 53f2ce1b-e361-46a0-8747-c03591f62e0b
Sentry Source Maps upload will include the release name and dist.
Sentry-CLI arguments: [/home/expo/workingdir/build/node_modules/@sentry/cli/bin/sentry-cli, react-native, gradle, --bundle, /home/expo/workingdir/build/android/app/build/generated/assets/react/release/index.android.bundle, --sourcemap, /home/expo/workingdir/build/android/app/build/generated/sourcemaps/react/release/index.android.bundle.map, --release, com.pixa.grocify@1.0.0+1, --dist, 1]
Processing react-native sourcemaps for Sentry upload.
> Analyzing 2 sources
> Rewriting sources
> Adding source map references
> Task :app:createBundleReleaseJsAndAssets_SentryUploadCleanUp SKIPPED
INFO    2026-04-03 13:58:24.551278588 +00:00 Loaded file referenced by SENTRY_PROPERTIES (/home/expo/workingdir/build/android/sentry.properties)
> Analyzing completed in 0.015s
> Rewriting completed in 0.333s
error: Auth token is required for this request. Please run `sentry-cli login` and try again!
Add --log-level=[info|debug] or export SENTRY_LOG_LEVEL=[info|debug] to see more output.
Please attach the full debug log to all bug reports.
> Task :react-native-worklets:configureCMakeRelWithDebInfo[x86]
> Task :react-native-keyboard-controller:lintVitalAnalyzeRelease
> Task :react-native-screens:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:62:9 The corresponding parameter in the supertype 'BaseReactPackage' is named 'name'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:63:9 The corresponding parameter in the supertype 'BaseReactPackage' is named 'reactContext'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:76:17 'constructor(name: String, className: String, canOverrideExistingModule: Boolean, needsEagerInit: Boolean, hasConstants: Boolean, isCxxModule: Boolean, isTurboModule: Boolean): ReactModuleInfo' is deprecated. This constructor is deprecated and will be removed in the future. Use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)].
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:24:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:54:77 Unchecked cast of '(CoordinatorLayout.Behavior<View!>?..CoordinatorLayout.Behavior<*>?)' to 'BottomSheetBehavior<Screen>'.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:426:42 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:6:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:56:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:222:31 'var targetElevation: Float' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:225:13 'fun setHasOptionsMenu(p0: Boolean): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:404:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:411:22 'fun onPrepareOptionsMenu(p0: Menu): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:414:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:419:22 'fun onCreateOptionsMenu(p0: Menu, p1: MenuInflater): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:441:22 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigShadowNode.kt:4:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigShadowNode.kt:10:5 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:9:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:37:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:6:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:65:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:48:42 'fun replaceSystemWindowInsets(p0: Int, p1: Int, p2: Int, p3: Int): WindowInsetsCompat' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:49:39 'val systemWindowInsetLeft: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:51:39 'val systemWindowInsetRight: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:52:39 'val systemWindowInsetBottom: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:4:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:5:8 'class NativeViewHierarchyManager : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:6:8 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:7:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:11:5 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:12:63 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:14:34 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:14:106 'class NativeViewHierarchyManager : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:7:8 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:25:13 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:32:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'left'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:33:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'top'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:34:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'right'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:35:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'bottom'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:71:9 The corresponding parameter in the supertype 'RootView' is named 'childView'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:72:9 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:79:46 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:83:9 The corresponding parameter in the supertype 'RootView' is named 'childView'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:84:9 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:95:34 The corresponding parameter in the supertype 'RootView' is named 't'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:63:9 The corresponding parameter in the supertype 'ReactCompoundView' is named 'touchX'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:64:9 The corresponding parameter in the supertype 'ReactCompoundView' is named 'touchY'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:68:9 The corresponding parameter in the supertype 'ReactCompoundViewGroup' is named 'touchX'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:69:9 The corresponding parameter in the supertype 'ReactCompoundViewGroup' is named 'touchY'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/gamma/tabs/TabsHostViewManager.kt:37:9 The corresponding parameter in the supertype 'TabsHostViewManager' is named 'view'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:19:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:153:45 'fun consumeDisplayCutout(): WindowInsetsCompat' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:194:58 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:201:31 'val uiImplementation: UIImplementation!' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:7:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:8:8 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:14:32 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:83:63 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
[Incubating] Problems report is available at: file:///home/expo/workingdir/build/android/build/reports/problems/problems-report.html
Deprecated Gradle features were used in this build, making it incompatible with Gradle 10.
You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.
For more on this, please refer to https://docs.gradle.org/9.0.0/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.
481 actionable tasks: 481 executed
FAILURE: Build failed with an exception.
* Where:
Script '/home/expo/workingdir/build/node_modules/@sentry/react-native/sentry.gradle' line: 180
* What went wrong:
Execution failed for task ':app:createBundleReleaseJsAndAssets_SentryUpload_com.pixa.grocify@1.0.0+1_1'.
> Process 'command '/home/expo/workingdir/build/node_modules/@sentry/cli/bin/sentry-cli'' finished with non-zero exit value 1
* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to generate a Build Scan (Powered by Develocity).
> Get more help at https://help.gradle.org.
BUILD FAILED in 2m 49s
Error: Gradle build failed with unknown error. See logs for the "Run gradlew" phase for more information.