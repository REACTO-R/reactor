export default function getUserScreen() {
  var extensionId = process.env.EXTENSION_ID
  return new Promise((resolve, reject) => {
    const request = {
      sources: ['screen']
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
