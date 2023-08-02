/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import base64 from 'react-native-base64';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Video, {DRMType} from 'react-native-video';
import axios from 'axios';
import qs from 'qs';

async function getSessionToken() {
  const data = qs.stringify({
    username: 'jommy.barban@visionmedia.com',
    password: 'Testing@123456',
    appId: 'vwjiGi3VX1JRdX522YAu',
    deviceId: 'DEVICE-84',
  });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://conducodev-espresso.screenerpassport.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-app-version': '11',
      'User-Agent':
        'AppleCoreMedia/1.0.0.18B92 (iPhone; U; CPU OS 14_4 like Mac OS X; en_us)',
      Cookie:
        'CloudFront-Key-Pair-Id=APKAINHZRVO6QTV46DKQ; CloudFront-Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9jZG4uc2NyZWVuZXJwYXNzcG9ydC5jb20vYXNzZXRzLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2OTA5MDMwOTR9fX1dfQ__; CloudFront-Signature=U3bzoFF98EkfzRRhr6efoVzm1jgArR-5eOs8~R-NwF3YdxsorqNLOCFNZRWw~5jK3Q4t-N23dA22GttPXodS18n8RAD8oeWumt-VGA2hWzIk9D59OmZxy97427CoHG0qDnLYuGbmP~mhfSw3ZtdZflooXlkZUbkDekF3hu55zDBwKrf1Dq9i~-iyUO5Xk97hjBczxSSUYFvXhzOu2eUwLDWfRFYbS0Rnn5MiAx1ht~9Pr9YcLbkscgRSxaq1Thx981X7k~uz1U3tS5taIAujGCZw8BSyf-VE4cnIEptDzoZb9HnNtTMvTuZvPWBqWoVSlfZ1c7x93uE18TM~ZRaMyw__; AWSALB=f5q5NU4LUzbjsRO4el797/eVlb8NcoNOLKzMm7hnyyMYdt9aSvji59bNpiJ6AgVoVhbU8R+Oz2s9o4gjuCxMHoi3cSiDpOVTA1fxHclcc1cDTIuHcGsEbhbgByVE; AWSALBCORS=f5q5NU4LUzbjsRO4el797/eVlb8NcoNOLKzMm7hnyyMYdt9aSvji59bNpiJ6AgVoVhbU8R+Oz2s9o4gjuCxMHoi3cSiDpOVTA1fxHclcc1cDTIuHcGsEbhbgByVE; AWSALBTG=BvljvOhbIem13+S4m9SCpqna5OjEpRgoxke0zkoMfN8VwvhnGnEYWP+Y486Uw9OuQC2f263Y44fKHT1xDmUDwIEODCPBatefnRN/ujXySftrqIJQ9aRrfmag7CYZR2F54/4WMdlGAPvXHH3Mi6hZpLtTcE/wSMLTuaystGqeFoSN; AWSALBTGCORS=BvljvOhbIem13+S4m9SCpqna5OjEpRgoxke0zkoMfN8VwvhnGnEYWP+Y486Uw9OuQC2f263Y44fKHT1xDmUDwIEODCPBatefnRN/ujXySftrqIJQ9aRrfmag7CYZR2F54/4WMdlGAPvXHH3Mi6hZpLtTcE/wSMLTuaystGqeFoSN; _csrf=qVAf33f2DcoaUlHnSSOm5_m6; connect.sid=s%3AN7Q-kuKmeFfRRsDJ4IPoJ3lzQOurp15f.bAHJCcPmuLSMG34ZCKy6MA0QXtC5U0%2BGLLCUI3FdN6g; sso-user=false',
    },
    data: data,
  };

  const response = await axios(config);
  return getPlayScreenerData(response.data.token);
}

async function getPlayScreenerData(sessionToken: string) {
  const data = qs.stringify({
    deviceId: 'DEVICE-84',
    entitlementId: '63852ee3cc74732316643839',
  });
  const config = {
    method: 'post',
    url: 'https://conducodev-espresso.screenerpassport.com/api/playScreener',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-app-version': '7',
      Authorization: `Bearer ${sessionToken}`,
    },
    data: data,
  };

  console.log('Getting PlayScreener Data');
  console.log('Config: ', config);

  return axios(config);
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const videoUrl =
    'https://daamnw5wqivkt.cloudfront.net/wmt:eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InZtXzYxOWU3ZTJmZjU5NDhjYjA1NjcyNGM5NV9zY3JlZW5lcnNfNjA4NzYifQ.eyJpc3MiOiJWaXNpb24gTWVkaWEiLCJraWQiOiJ2bV82MTllN2UyZmY1OTQ4Y2IwNTY3MjRjOTVfc2NyZWVuZXJzXzYwODc2Iiwid21wYXQiOiIwN0JGOTFBRDU3MDk2MzBGMzU3NUI1OTMxOTkyNTYzRTU4Q0NGNDNFNzhBNjVBMjcyODJGMkQxNUE4NjcxNTUzODEzNDUwMUVGNUZEQ0REODk0MEYxQjlDQzQ3MkI0QjdEMTY3MkJCMEQ0QUVGQUFDRDkyNjNFOEVBQUY2RkZDNTUxRDc3QzhCMkY5Q0EwMTFCMjAyRUQwMzIwNzRDMTkzRkY5OTQzMkNBRTgyOUY0MTA2OERDQ0RGNjQxNEJCMzI3MzkxMDU1MTEyOEM3MTkxREI4NEZGQkQ3MkUzNjU1MjRGMzM3MzVCMjI1MjgyOUNCN0MyOTMxOUMzMTlGRjIzRjc1QzA2M0M0Mzc5NjM3NThDQkVCQTNEOTg0RkM1QTQ5NTNENEI2QTI2QzczM0YzNjkxOUNGOTRERkMyQUM5NThCQTJEMjI3QkY2Q0Q4NzQzMDY2MkI4M0I2QTIzRjgwRTkzMjAxMjVBNEZFOUM1NkJFMTU4OTJCQzMzRTY4QjhDM0FCMzZBREYzMDc2MjdCM0JDMTZFNUJCREVBQUQzRDhGRjNENjE3NDc4Q0VEQ0U3RkRCQTM0M0VDNkZDQTZEMThDMjA1QkFGQjE5QjBFMDAxQzRDNTc3N0FDOEJEMzY2RDFFNzUwOUE1MDgyM0RFMDIwNjE2MEUyMTg5NDUxQSIsIndtcGF0Zm10IjoiaGV4Iiwid21wYXRsZW4iOjIwNDgsIndtdmVyIjoxLCJpYXQiOjE2NzM5MjA5Njd9.joubPW6QGCDaw3YNM4EwFpQ435DoKYFAH_H31RvoFY8XIgesr4J2KcU2hVGY_M4F7muuCeEZDPx8_m3wyQF6sgYKaE5L0sHjS1P2HJo1jKdTJ2F4EqbqVquogkvghcNkjnsG6c0SFRWbjbTFVb7XKqdGtBuaFJmsuu16NLPjX6I1FDp0lY07Mu3vzJ84Pv2G2rAbWXNF18DXifqmISKXfSN1NfbOtjexwRpIMIKgkcHYtu58xj9e1haiOJx-NKsqd42UUq8BxvQObT7ZGYqltU9Tk2bjnZI4WuxMGWoV0JtwOsUjCTtq_fZatwEnKa0s5xKYJXo9WVbJDLk7VODJdg/3102/60876/drm/hls/v5/BabylonVisionMediaAwardsScreenersV2only_a.m3u8';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Video
            source={{
              uri: videoUrl,
            }}
            drm={{
              type: DRMType.FAIRPLAY,
              contentId: '289643f5-5bba-4de5-93f6-c44043837ff8',
              certificateUrl:
                'https://documentation.fordela.com/fairplay/fairplay.cer',
              // licenseServer:
              //   'https://fps.ezdrm.com/api/licenses/auth?pX=EE9AD7&vm_token=' +
              //   ezDrmToken,

              getLicense: async (spcString, contentId) => {
                const tokenData = await getSessionToken();

                console.log('contentID');
                console.log(contentId);
                console.log('EZDRM TOKEN');
                console.log(tokenData.data.ezDrmToken);
                console.log('SPC DATA (raw from device)');
                console.log(spcString);

                // trying with axios instead of fetch
                // const config = {
                //   method: 'post',
                //   url:
                //     'https://fps.ezdrm.com/api/licenses/auth?pX=EE9AD7&vm_token=' +
                //     tokenData.data.ezDrmToken,
                //   headers: {
                //     'Content-Type': 'application/x-mpegURL',
                //     'X-Apple-iPhone': '',
                //   },
                //   data: base64.decode(spcString),
                // };

                // return axios(config)
                //   .then((response: any) => {
                //     console.log('LICENSE RESPONSE');
                //     console.log(response.data);
                //     return response.data;
                //   })
                //   .catch((error: any) => {
                //     console.log('LICENSE ERROR');
                //     console.log(error);
                //     return error;
                //   });

                // this is the request erroring out, 500 error, "An error has accurred"
                return fetch(
                  'https://fps.ezdrm.com/api/licenses/auth?pX=EE9AD7&vm_token=' +
                    tokenData.data.ezDrmToken,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/octet-stream',
                      'X-Apple-iPhone': '',
                    },
                    // spcString looks like a base64 encoded string, just in case I'm decoding it here
                    // but we've tried it both ways and it doesn't work
                    body: base64.decode(spcString),
                  },
                )
                  .then(response => {
                    console.log('LICENSE RESPONSE');
                    console.log(response);
                    return response.text();
                  })
                  .then(response => {
                    console.log('TEXT LICENSE RESPONSE');
                    console.log(response);
                    return response;
                  })
                  .catch(error => {
                    console.error('Error', error);
                  });
              },
            }}
            style={styles.backgroundVideo}
            controls={true}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundVideo: {
    position: 'relative',
    width: '100%',
    height: 240,
  },
  text: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;
