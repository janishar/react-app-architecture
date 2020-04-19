import { asset } from '../../../utils/assetHelper';

// required for the webpack to bundle inthe package
import './test-image.png';

// convinent method to get he usable path of the assets
export const testImage = asset('./test-image.png');
