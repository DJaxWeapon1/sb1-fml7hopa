import React, { useState } from 'react';
import { ArrowRight, Check, Github, Settings2, Zap } from 'lucide-react';

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: 'Connect Platforms',
    description: 'Link your Shopify and QuickBooks accounts',
  },
  {
    id: 2,
    title: 'Configure Sync',
    description: 'Choose what data to synchronize',
  },
  {
    id: 3,
    title: 'Review & Launch',
    description: 'Verify your settings and go live',
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [connected, setConnected] = useState({
    shopify: false,
    quickbooks: false,
  });
  const [syncOptions, setSyncOptions] = useState({
    orders: false,
    inventory: false,
    customers: false,
  });

  const handleConnect = (platform: 'shopify' | 'quickbooks') => {
    setConnected(prev => ({ ...prev, [platform]: true }));
  };

  const handleToggleSync = (option: keyof typeof syncOptions) => {
    setSyncOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Integration Builder</h1>
            <p className="text-gray-400">Connect your e-commerce ecosystem</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors">
              <Settings2 size={20} />
            </button>
            <button className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  currentStep >= step.id ? 'text-white' : 'text-gray-500'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    currentStep >= step.id
                      ? 'bg-blue-500'
                      : 'bg-gray-800'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check size={16} />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <span className="hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {currentStep === 1 && (
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">Connect Your Platforms</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleConnect('shopify')}
                  className={`p-4 rounded-lg border ${
                    connected.shopify
                      ? 'bg-blue-500 bg-opacity-20 border-blue-500'
                      : 'bg-gray-800 border-gray-700 hover:border-blue-500'
                  } transition-all group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/shopify.svg"
                      alt="Shopify"
                      className="h-8 w-8"
                    />
                    {connected.shopify ? (
                      <Check className="text-blue-500" size={20} />
                    ) : (
                      <ArrowRight
                        className="text-gray-400 group-hover:text-blue-500 transition-colors"
                        size={20}
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">Shopify</h3>
                  <p className="text-sm text-gray-400">Connect your store</p>
                </button>

                <button
                  onClick={() => handleConnect('quickbooks')}
                  className={`p-4 rounded-lg border ${
                    connected.quickbooks
                      ? 'bg-blue-500 bg-opacity-20 border-blue-500'
                      : 'bg-gray-800 border-gray-700 hover:border-blue-500'
                  } transition-all group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/quickbooks-2.svg"
                      alt="QuickBooks"
                      className="h-8 w-8"
                    />
                    {connected.quickbooks ? (
                      <Check className="text-blue-500" size={20} />
                    ) : (
                      <ArrowRight
                        className="text-gray-400 group-hover:text-blue-500 transition-colors"
                        size={20}
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">QuickBooks</h3>
                  <p className="text-sm text-gray-400">Connect your accounting</p>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">Configure Sync Options</h2>
              <div className="space-y-4">
                {Object.entries(syncOptions).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleToggleSync(key as keyof typeof syncOptions)}
                    className={`w-full p-4 rounded-lg border ${
                      value
                        ? 'bg-blue-500 bg-opacity-20 border-blue-500'
                        : 'bg-gray-800 border-gray-700 hover:border-blue-500'
                    } transition-all flex items-center justify-between group`}
                  >
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1 capitalize">
                        {key}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Sync {key} between platforms
                      </p>
                    </div>
                    <Zap
                      className={`${
                        value ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'
                      } transition-colors`}
                      size={20}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">Review & Launch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Connected Platforms</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://cdn.worldvectorlogo.com/logos/shopify.svg"
                          alt="Shopify"
                          className="h-6 w-6"
                        />
                        <span className="text-white">Shopify</span>
                        <Check className="text-green-500 ml-auto" size={16} />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://cdn.worldvectorlogo.com/logos/quickbooks-2.svg"
                          alt="QuickBooks"
                          className="h-6 w-6"
                        />
                        <span className="text-white">QuickBooks</span>
                        <Check className="text-green-500 ml-auto" size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Sync Configuration</h3>
                  <div className="space-y-2">
                    {Object.entries(syncOptions).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-4 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-between"
                      >
                        <span className="text-white capitalize">{key}</span>
                        {value ? (
                          <span className="text-green-500 flex items-center gap-2">
                            <Check size={16} /> Enabled
                          </span>
                        ) : (
                          <span className="text-gray-500">Disabled</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (currentStep < steps.length) {
                  setCurrentStep(currentStep + 1);
                } else {
                  // Handle launch
                  console.log('Launching integration...');
                }
              }}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors ml-auto"
            >
              {currentStep === steps.length ? 'Launch Integration' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;