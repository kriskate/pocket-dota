# Pocket Dota

Open source **React Native** app that keeps track of **Dota 2**'s heroes, items and player statistics

*[... app landing page](http://pocket-dota.info)*



# CONTRIBUTING

## General

If you've made a contribution to **Pocket Dota**, make sure to drop an e-mail about it at <pocket.dota.app@gmail.com> explaining (and/ or pointing to) the contribution, so that if in the future the app will have **premium features**, you'll get them for free!
You will also be featured in a dedicated **Contributors** page within the app, and have my *gratitude* and also that of the people enjoying your contribution :relaxed:.

## Translations

> *Note: the app has no translations integrated at the moment, but the logic for the translations is written. They will be available soon.*

If you'd like to contribute to the app's translations, check out [Pocket Dota's crowdin page](https://crowdin.com/project/pocket-dota).
Currently, the supported languages are: ( :white_check_mark: means it's already done) 
| Language                 | Done                         |
| -----------------------: | :-----------------------: |
| "de-DE": "Deutsch"       |  |
| "en-US": "English"       | :white_check_mark: |
| "es-ES": "Español"       |  |
| 'fr-FR": "French"        |  |
| "ja-JP": "日本語"         |  |
| "ro-RO": "Română"        | :white_check_mark: |
| "ru-RU": "Русский"        |  |

### ... not managed by Pocket Dota
Please take note that the ***Dota 2***'s **heroes/ items/ patch notes** descriptions and **other in-game texts** are translated by [Valve](https://www.valvesoftware.com/en/), and that the **Stats** screen is [Open Dota](https://www.opendota.com/)'s. As such, Pocket Dota cannot be responsible for any missing/ wrong translations in the above mentioned places.

## App development

Pocket Dota is developed using [React Native](https://facebook.github.io/react-native/), via [Expo](http://expo.io).

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

**Dota 2** game files and images provided by [Elo](https://elo.io/), through [Dota buff](https://github.com/dotabuff/d2vpkr) and parsed by **Pocket Dota**'s own data generator service.

## Player statistics

The data presented through the **Player statistics** screen are information collected, parsed, displayed and owned by [Open Dota](https://www.opendota.com).

For an even more in-depth analysis of your player profile, it is recommended to open their website on a desktop/ laptop computer and create an **Open Dota** account.


> #### **Pocket Dota** is hereby not created, sponsored or endorsed by any of the companies mentioned on this page. It only uses open source data.