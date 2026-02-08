import { http, createConfig } from 'wagmi';
import { polygonAmoy, polygon } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || 'YOUR_PROJECT_ID';

export const config = getDefaultConfig({
    appName: 'TERRA AI',
    projectId,
    chains: [polygonAmoy, polygon],
    transports: {
        [polygonAmoy.id]: http(),
        [polygon.id]: http(),
    },
    ssr: true,
});

export const CONTRACTS = {
    TERRA_TOKEN: {
        [polygonAmoy.id]: '0x0000000000000000000000000000000000000000' as `0x${string}`,
        [polygon.id]: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    },
} as const;
