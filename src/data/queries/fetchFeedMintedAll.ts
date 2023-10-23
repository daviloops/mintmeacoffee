import fetchData from '@/data/fetchData';
import { coffeeNftContractId, CONFIG } from '@/config/constants';

const fetchFeedMintedAll = () => fetchData(CONFIG.mbGraphEndpoint, {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query FetchFeedMintedAll {
        mb_views_nft_activities(
          where: {
            nft_contract_id: {_eq: "${coffeeNftContractId}"}
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

export default fetchFeedMintedAll;
