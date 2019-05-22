# Pocket Dota Info

Open source **React Native** app that keeps track of **Dota 2**'s heroes, items and player statistics


• *[... app landing page](http://pocket-dota.info)*

Tech:

• App: React Native (via Expo), Redux, React-i18n, Amplitude, Jest

• Backend: NodeJS, Amplitude, Docker, Open Dota, Dota 2 game files,
Google Cloud Services (Kubernetes, App Engine, Stackdriver)

• platforms: Android, IOS

• description: Mobile app that collects data from Dota 2’s game files and displays it, along with player statistics (via a WebView).

The app’s aim is to be a companion for players who want to improve their knowledge of the game.

• Initial release date: 16.10.2018 (v1.1.0)

• Rebranding - re-release - 27.03.2019 (v2.0.0)




# CONTRIBUTING

## General

If you've made a contribution to **Pocket Dota Info**, make sure to drop an e-mail about it at <pocket.dota.app@gmail.com> explaining (and/ or pointing to) the contribution, so that if in the future the app will have **premium features**, you'll get them for free!
You will also be featured in a dedicated **Contributors** page within the app, and have my *gratitude* and also that of the people enjoying your contribution :relaxed:.

## Translations

> *As a general rule, please don't make the text lengths much longer than the original English ones, as this might affect Pocket Dota Info's appearance.*

If you'd like to contribute to the app's translations, check out [Pocket Dota Info's crowdin page](https://crowdin.com/project/pocket-dota).
The sign-up process and hands-on translation process are really straightforward.

Currently, the supported languages are:

| Language                 | Wiki               | App                | Stats              |
| -----------------------: | :----------------: | :----------------: | :----------------: |
| "de-DE": "Deutsch"       | :white_check_mark: |                    | :white_check_mark: |
| "en-US": "English"       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| "es-ES": "Español"       | :white_check_mark: |                    | :white_check_mark: |
| 'fr-FR": "Français"      | :white_check_mark: | :white_check_mark: |                    |
| "ja-JP": "日本語"         | :white_check_mark: |                    | :white_check_mark: |
| "ro-RO": "Română"        | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| "ru-RU": "Русский"       | :white_check_mark: |                    | :white_check_mark: |

The languages which are partially supported (heroes and items only), will be represented by a ![no](https://i.imgur.com/tEvr2Ma.png) sign in-app.


### ... not managed by Pocket Dota Info
Please take note that the ***Dota 2***'s **heroes/ items/ patch notes** descriptions and **other in-game texts** are translated by [Valve](https://www.valvesoftware.com/en/), and that the **Stats** screen is [Open Dota](https://www.opendota.com/)'s. As such, Pocket Dota Info cannot be responsible for any missing/ wrong translations in the above mentioned places.

**The wiki data** - comes from the game files, so the wiki translations are already made (but sometimes incomplete - i.e. patch notes).
If you'd like to help translating the Dota2 game itself, you can try enrolling with [Steam Translation](https://translation.steampowered.com/).

**The stats section** - comes from OpenDota. If you encounter any translation problems with this section, you can help them out [here](https://translate.opendota.com/).

#### Patch notes

Several language don't have the full Patch notes in Dota 2's game files.

For instance, at the time of this writing, the Japanese language does not have Patch Notes.

Missing patch notes are imported from English.

## App development

Pocket Dota Info is developed using [React Native](https://facebook.github.io/react-native/), via [Expo](http://expo.io).

### Prerequisites
- [nodeJS](https://nodejs.org)
- [yarn](https://yarnpkg.com/lang/en/docs/install/)
- [expo-cli](https://expo.io/tools#cli) - just run ```yarn global add expo-cli```

## Development
- [fork this repo](https://help.github.com/articles/fork-a-repo/)
- ```yarn``` or ```npm install``` in the root folder
- ```expo start``` in the root folder
- on an (Android/ IOS) emulator, or on an actual physical device, install the Expo client (the expo-cli can do that for emulators, read the [docs](https://docs.expo.io/versions/latest/workflow/expo-cli)). It's much easier on an Android emulator/ device, as for IOS you have to own an app in order to view it with Expo
- ... Javascript/ React Native away!

## Merging the changes
If you're satisfied with the added functionality or bugfix you wrote:
- make sure you used a similar code style to how the app is written (not much here, pure ES6/ React way, double-space tabs)
- [make a pull request](https://help.github.com/articles/about-pull-requests/)
- while doing the pull request, make sure to be as explicit as possible regarding the change(s) made



# Copyright information

## Wiki data

The **Dota 2** game, logo, the contents of game files (heroes, abilities, items, patch notes, tips), as well as their artwork/ names/ descriptions are © [Valve corporation](https://www.valvesoftware.com).

**Dota 2** game files and images provided by [Elo](https://elo.io/), through [Dota buff](https://github.com/dotabuff/d2vpkr) and parsed by **Pocket Dota Info**'s own data generator service.

## Player statistics

The data presented through the **Player statistics** screen are information collected, parsed, displayed and owned by [Open Dota](https://www.opendota.com).

For an even more in-depth analysis of your player profile, it is recommended to open their website on a desktop/ laptop computer and create an **Open Dota** account.


> #### **Pocket Dota Info** is hereby not created, sponsored or endorsed by any of the companies mentioned on this page. It only uses open source data.


# License
You can read the app's license [here](https://pocket-dota.info/license).
