import { SkeletonScreen } from "../../components";


export interface WelcomeScreenPartProps  {
    id: number,
    header: {
        icon?: boolean
        text?: string
    },
    body: {
        text: string
    },

    footer:{
        text: string
    }
}

function WelcomeScreenPart (props: WelcomeScreenPartProps) {
    const content = (
        <>
        
        </>
    )
    return <SkeletonScreen content  />
}