export default function getUserScreen() {
  var extensionId = 'gllddpdcaodghmbogkaifdhpimnkbhjb'
  return new Promise((resolve, reject) => {
    const request = {
      sources: ['tab']
    }
    chrome.runtime.sendMessage(extensionId, request, response => {
      if (response && response.type === 'success') {
        resolve({streamId: response.streamId})
      } else {
        reject(new Error('Could not get stream'))
      }
    })
  }).then(response => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: response.streamId
        }
      }
    })
  })
}
