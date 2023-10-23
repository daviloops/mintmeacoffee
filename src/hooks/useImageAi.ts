import { useState } from 'react';
import deepai from 'deepai';

import { storageBaseUrl, coffeeImgId, deepAiApiKey, deepAiDemoApiKey2 } from '@/config/constants';

const useImageAi = () => {
  const apiKey = !!deepAiApiKey ? deepAiApiKey : deepAiDemoApiKey2;
  deepai.setApiKey(apiKey);

  const generateImage = async (description: string) => {
    let newImageUrl = null;
      var resp = await deepai.callStandardApi("image-editor", {
        image: storageBaseUrl + coffeeImgId,
        text: description,
      })
      .then(res => {
        newImageUrl = res.output_url;
      });

    return newImageUrl
  };

  return { deepai, generateImage };
};

export default useImageAi;