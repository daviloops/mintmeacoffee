const deepai = require('deepai');

import { baseImgUrl, deepAiApiKey, deepAiDemoApiKey2 } from '@/config/constants';

const useImageAi = () => {
  const apiKey = !!deepAiApiKey ? deepAiApiKey : deepAiDemoApiKey2;
  deepai.setApiKey(apiKey);

  const generateImage = async (description: string) => {
    let newImageUrl = null;
    await deepai.callStandardApi("image-editor", {
        image: baseImgUrl,
        text: description,
      })
      .then(({ output_url }: { output_url: string }) => {
        newImageUrl = output_url;
      });

    return newImageUrl
  };

  return { deepai, generateImage };
};

export default useImageAi;