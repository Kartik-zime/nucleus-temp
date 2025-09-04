import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Loader2, Map, ArrowLeft, Search, RefreshCw, AlertTriangle } from 'lucide-react';

type Step = 'select-company' | 'select-pipeline' | 'map-stages' | 'review';

const steps: { id: Step; label: string }[] = [
  { id: 'select-company', label: 'Select Company' },
  { id: 'select-pipeline', label: 'Select Pipeline' },
  { id: 'map-stages', label: 'Map Deal Stages' },
  { id: 'review', label: 'Review & Confirm' }
];

// Sample data
const sampleCompanies = [
  { id: 1, name: 'Acme Corp', crmType: 'Salesforce' },
  { id: 2, name: 'TechStart Inc', crmType: 'HubSpot' },
  { id: 3, name: 'Global Solutions', crmType: 'Salesforce' },
  { id: 4, name: 'Innovate Labs', crmType: 'Pipedrive' },
  { id: 5, name: 'Future Systems', crmType: 'HubSpot' },
  { id: 6, name: 'Digital Dynamics', crmType: 'Salesforce' }
];

const samplePipelines = [
  { id: 1, name: 'Sales Pipeline' },
  { id: 2, name: 'Enterprise Pipeline' },
  { id: 3, name: 'Startup Pipeline' }
];

const sampleStages = [
  { id: 1, name: 'Qualification' },
  { id: 2, name: 'Meeting Scheduled' },
  { id: 3, name: 'Proposal Sent' },
  { id: 4, name: 'Negotiation' },
  { id: 5, name: 'Closed Won' }
];

// Sample Zime categories with sequence
const zimeCategories = [
  { id: 1, name: 'Initial Contact', sequence: 1 },
  { id: 2, name: 'Qualification', sequence: 2 },
  { id: 3, name: 'Meeting Scheduled', sequence: 3 },
  { id: 4, name: 'Proposal Sent', sequence: 4 },
  { id: 5, name: 'Negotiation', sequence: 5 },
  { id: 6, name: 'Closed Won', sequence: 6 },
  { id: 7, name: 'Closed Lost', sequence: 7 }
];

export function DealStageMapper() {
  const [currentStep, setCurrentStep] = useState<Step>('select-company');
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Form state
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<number | null>(null);
  const [mappedStages, setMappedStages] = useState<Record<number, number>>({});
  const [companySearch, setCompanySearch] = useState('');
  const [pipelineSearch, setPipelineSearch] = useState('');
  const [isLoadingStages, setIsLoadingStages] = useState(true);
  const [crmStages, setCrmStages] = useState<Array<{ id: number; name: string }>>([]);
  const [stageMappings, setStageMappings] = useState<Record<number, number>>({});

  // Filter companies based on search
  const filteredCompanies = sampleCompanies.filter(company => 
    company.name.toLowerCase().includes(companySearch.toLowerCase()) ||
    company.id.toString().includes(companySearch)
  );

  // Filter pipelines based on search
  const filteredPipelines = samplePipelines.filter(pipeline =>
    pipeline.name.toLowerCase().includes(pipelineSearch.toLowerCase())
  );

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleStageMapping = (sourceStageId: number, targetStageId: number) => {
    setMappedStages(prev => ({
      ...prev,
      [sourceStageId]: targetStageId
    }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setStatus(null);
    
    try {
      // TODO: Implement the deal stage mapping logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus({
        type: 'success',
        message: 'Deal stages mapped successfully!'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to map deal stages. Please try again.'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Simulate fetching CRM stages
  const fetchCrmStages = async () => {
    setIsLoadingStages(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Sample CRM stages based on selected company's CRM type
      const stages = [
        { id: 1, name: 'New' },
        { id: 2, name: 'Qualified' },
        { id: 3, name: 'Meeting Scheduled' },
        { id: 4, name: 'Proposal' },
        { id: 5, name: 'Negotiation' },
        { id: 6, name: 'Closed Won' },
        { id: 7, name: 'Closed Lost' }
      ];
      setCrmStages(stages);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to fetch CRM stages. Please try again.'
      });
    } finally {
      setIsLoadingStages(false);
    }
  };

  // Fetch stages when entering the map-stages step
  useEffect(() => {
    if (currentStep === 'map-stages') {
      fetchCrmStages();
    }
  }, [currentStep]);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    steps.findIndex(s => s.id === currentStep) >= index
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${
                    steps.findIndex(s => s.id === currentStep) >= index
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-600'
                  }`}>
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-orange-500'
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Back Button */}
          {currentStep !== 'select-company' && (
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          )}

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep === 'select-company' && (
              <div className="flex flex-col h-[calc(100vh-16rem)]">
                <h2 className="text-xl font-semibold mb-4">Select Company</h2>
                
                {/* Search Bar - Fixed */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    placeholder="Search by company name or ID..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none"
                  />
                </div>

                {/* Company List - Scrollable */}
                <div className="flex-1 overflow-y-auto pr-2">
                  <div className="space-y-4">
                    {filteredCompanies.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No companies found matching your search
                      </div>
                    ) : (
                      filteredCompanies.map(company => (
                        <div
                          key={company.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedCompany === company.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                          onClick={() => setSelectedCompany(company.id)}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <span className="font-medium">{company.name}</span>
                              <span className="text-gray-500">ID: {company.id}</span>
                            </div>
                            <span className={`px-2 py-1 rounded text-sm font-medium whitespace-nowrap ${
                              company.crmType === 'Salesforce' 
                                ? 'bg-blue-100 text-blue-700'
                                : company.crmType === 'HubSpot'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {company.crmType}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Next Button - Fixed */}
                <div className="mt-6 pt-4 border-t flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!selectedCompany}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedCompany
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'select-pipeline' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Select Pipeline</h2>
                  <span className="text-sm text-gray-500">
                    {filteredPipelines.length} {filteredPipelines.length === 1 ? 'pipeline' : 'pipelines'} found
                  </span>
                </div>
                <div className="space-y-4">
                  {filteredPipelines.map(pipeline => (
                    <div
                      key={pipeline.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPipeline === pipeline.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setSelectedPipeline(pipeline.id)}
                    >
                      <h3 className="font-medium">{pipeline.name}</h3>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!selectedPipeline}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedPipeline
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'map-stages' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Map Deal Stages</h2>
                  <button
                    onClick={fetchCrmStages}
                    disabled={isLoadingStages}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw size={16} className={isLoadingStages ? 'animate-spin' : ''} />
                    Refresh
                  </button>
                </div>

                {isLoadingStages ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={24} className="animate-spin text-orange-500" />
                      <span className="text-gray-500">Loading CRM stages...</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {crmStages.map(stage => {
                      const isMapped = stageMappings[stage.id] !== undefined;
                      return (
                        <div 
                          key={stage.id} 
                          className={`flex items-center gap-4 p-4 border rounded-lg transition-colors ${
                            isMapped 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-red-200 bg-red-50'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{stage.name}</span>
                              <span className="text-sm text-gray-500">(CRM Stage)</span>
                              {!isMapped && (
                                <span className="text-sm text-red-500">* Required</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">→</span>
                            <select
                              value={stageMappings[stage.id] || ''}
                              onChange={(e) => setStageMappings(prev => ({
                                ...prev,
                                [stage.id]: Number(e.target.value)
                              }))}
                              className={`flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none min-w-[200px] ${
                                !isMapped ? 'border-red-300' : 'border-gray-200'
                              }`}
                            >
                              <option value="">Select Zime Category</option>
                              {zimeCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                  {category.sequence}. {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={isLoadingStages || Object.keys(stageMappings).length !== crmStages.length}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      !isLoadingStages && Object.keys(stageMappings).length === crmStages.length
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="flex flex-col h-[calc(100vh-16rem)]">
                <h2 className="text-xl font-semibold mb-6">Review & Confirm</h2>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border rounded-lg bg-white">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Selected Company</h3>
                    <p className="text-lg font-medium">
                      {sampleCompanies.find(c => c.id === selectedCompany)?.name}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg bg-white">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Selected Pipeline</h3>
                    <p className="text-lg font-medium">
                      {samplePipelines.find(p => p.id === selectedPipeline)?.name}
                    </p>
                  </div>
                </div>

                {/* Stage Mappings Table - Scrollable */}
                <div className="flex-1 border rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-gray-50 px-4 py-3 border-b flex-shrink-0">
                    <h3 className="font-medium">Stage Mappings</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="divide-y">
                      {crmStages.map(stage => {
                        const mappedCategory = zimeCategories.find(c => c.id === stageMappings[stage.id]);
                        const isValid = mappedCategory !== undefined;
                        
                        return (
                          <div key={stage.id} className="p-4 flex items-center gap-4">
                            {/* Validation Indicator */}
                            <div className="flex-shrink-0">
                              {isValid ? (
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                  <CheckCircle size={16} className="text-green-600" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                  <XCircle size={16} className="text-red-600" />
                                </div>
                              )}
                            </div>

                            {/* Mapping Details */}
                            <div className="flex-1 grid grid-cols-3 gap-4">
                              <div>
                                <span className="text-sm text-gray-500">CRM Stage</span>
                                <p className="font-medium">{stage.name}</p>
                              </div>
                              <div className="flex items-center justify-center">
                                <span className="text-gray-400">→</span>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Zime Category</span>
                                <p className={`font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                                  {mappedCategory ? `${mappedCategory.sequence}. ${mappedCategory.name}` : 'Not Mapped'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Validation Summary */}
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    {Object.keys(stageMappings).length === crmStages.length ? (
                      <>
                        <CheckCircle size={20} className="text-green-600" />
                        <span className="text-green-700 font-medium">All stages are properly mapped</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={20} className="text-orange-600" />
                        <span className="text-orange-700 font-medium">
                          {crmStages.length - Object.keys(stageMappings).length} stages need to be mapped
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t flex justify-end gap-3 flex-shrink-0">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating || Object.keys(stageMappings).length !== crmStages.length}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      !isUpdating && Object.keys(stageMappings).length === crmStages.length
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isUpdating ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Confirming...
                      </span>
                    ) : (
                      'Confirm Mapping'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Status Message */}
          {status && (
            <div className={`mt-6 p-4 rounded-lg ${
              status.type === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center gap-2">
                {status.type === 'success' ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <XCircle size={20} className="text-red-500" />
                )}
                <span className={status.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                  {status.message}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 