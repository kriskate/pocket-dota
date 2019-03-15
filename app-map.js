import createStore from "./src/reducers/createStore";

// alerts
import { alertUpdateCheckAvailable, alertAppUpdateDone, alertLanguageDownload } from "./src/utils/Alerts";

// actions
import { Actions as UpdateActions } from "./src/reducers/update";
import { Actions as WikiActions } from "./src/reducers/wiki";

// React components
import InitialLanguageSelector from "./src/components/Settings/InitialLanguageSelector";
import Updater from "./src/Updater";
import LanguageDownloading from "./src/components/Updaters/LanguageDownloading";
import AppDownloading from "./src/components/AppDownloading";
import WikiDownloading from "./src/components/WikiDownloading";

// utils
import { Updates } from "expo";
import { defaultLanguage } from "./src/localization";

const store = createStore();
const { currentLanguage } = store.getState().wiki;

const Legend = {
  show = () => {/* mount selected component */},
  hide = () => {/* unmount selected component */},
  then = () => {/* after the current async task is done */},
  userThen = () => {/* after the user has taken an action */},
}



// 1. user opens app

if(!currentLanguage) {
  // there is no language already selected; initial app run

  Legend.show(<InitilLanguageSelector />)
  Legend.userThen(userSelectedLanguage => {

    if(userSelectedLanguage != defaultLanguage) {

      Legend.show(alertLanguageDownload)
  
      if(languageDownloading) {
  
        await Legend.show(<LanguageDownloading />)
        Legend.then(downloadFinished => {
          WikiActions.downloadLanguage_done(downloadFinished)
          Legend.hide(<InitialLanguageSelector />)
          Legend.show(<Updater />)
        }) 
      }
    } else {
      Legend.hide(<InitialLanguageSelector />)
      Legend.show(<Updater />)
    }
    
  })
} else {
  // app is not in it's initial run, so wiki data and language already exist
  
  Legend.show(<Updater />)
}



// 2. updater gets mounted

Updater.onComponentDidMount = () => {

  await Updater._checkUpdate('App')
  Legend.then(newApp => {

    if(newApp) {
      alertUpdateCheckAvailable('App')
      Legend.userThen(ok => {
        if(ok) {
          await Legend.show(<AppDownloading />)
          Legend.then(() => {
            alertAppUpdateDone()
            Legend.userThen(ok => {
              if(ok) Updates.reloadFromCache()
            })
          })
        }
      })
    }
  })

  await Updater._checkUpdate('Wiki')
  Legend.then(newWiki => {
    if(newWiki) {
      await Legend.show(<WikiDownloading />)
      Legend.then(newWikiData => {
        WikiActions.newWiki(newWikiData)
        hide(<WikiDownloading />)
      })
    }
  })

}