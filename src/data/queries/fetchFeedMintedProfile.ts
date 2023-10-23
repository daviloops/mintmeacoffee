import fetchData from '@/data/fetchData';
import { coffeeNftContractId, CONFIG } from '@/config/constants';

const fetchFeedMintedProfile = (profileId: string) => fetchData(CONFIG.mbGraphEndpoint, {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query FetchFeedMintedThings {
        mb_views_nft_activities(
          where: {
            nft_contract_id: {_eq: "${coffeeNftContractId}"}
            action_receiver: {_eq: "${profileId}"}
            kind: {_eq: "mint"}
          },
          order_by: {timestamp: desc}
        ) {
            id: token_id
            createdAt: timestamp
            sender: action_sender
            receiver: action_receiver
            title
            description
            extra
            price
            media
            metadata_id
          }
      }
    `,
  }),
});
export default fetchFeedMintedProfile;
