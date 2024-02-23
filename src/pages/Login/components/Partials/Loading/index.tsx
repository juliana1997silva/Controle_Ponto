// Styles
import { Spinner } from "./styles";

type Props = {
    size?: number | string;
}

function Loading ({ size }: Props) {
    return (
        <Spinner size={size} />
    )
}

export default Loading;