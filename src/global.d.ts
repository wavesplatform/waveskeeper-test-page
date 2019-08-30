import WavesKeeper from '@waves/waveskeeper-types';

interface Window {
  WavesKeeper: WavesKeeper.TWavesKeeperApi;
}

interface ITestStep {
  testText: string;
  isPassed: boolean;
}

interface ICaseProps {
  keeperApi: KeeperService;
  onLogMessage: Function;
  onTestRun: (steps: Array<ITestStep>) => void;
}
