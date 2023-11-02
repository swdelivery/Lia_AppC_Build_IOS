fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### send_message

```sh
[bundle exec] fastlane send_message
```

Send discord message

### test_message

```sh
[bundle exec] fastlane test_message
```



### sync_onesignal

```sh
[bundle exec] fastlane sync_onesignal
```

Create Onesignal certificate

### sync_udids

```sh
[bundle exec] fastlane sync_udids
```

Sync devices

### upload_firebase

```sh
[bundle exec] fastlane upload_firebase
```

Upload build to firebase

### upload_installr

```sh
[bundle exec] fastlane upload_installr
```

Upload build to installr

### get_team_names

```sh
[bundle exec] fastlane get_team_names
```



### match_check

```sh
[bundle exec] fastlane match_check
```



### google_key

```sh
[bundle exec] fastlane google_key
```



----


## iOS

### ios build

```sh
[bundle exec] fastlane ios build
```

Process build

### ios submit_review

```sh
[bundle exec] fastlane ios submit_review
```

Submit for review

----


## Android

### android build

```sh
[bundle exec] fastlane android build
```

Process build

### android store_listing

```sh
[bundle exec] fastlane android store_listing
```

Update Store Listing

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
