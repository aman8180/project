import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VerificationDocumentsForm = ({ formData, setFormData, errors, onNext, onPrevious }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    gstCertificate: null,
    businessLicense: null,
    panCard: null,
    addressProof: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: file
    }));
    handleInputChange(field, file?.name || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!uploadedFiles.gstCertificate) newErrors.gstCertificate = 'GST certificate is required';
    if (!uploadedFiles.businessLicense) newErrors.businessLicense = 'Business license is required';
    if (!uploadedFiles.panCard) newErrors.panCard = 'PAN card is required';
    if (!uploadedFiles.addressProof) newErrors.addressProof = 'Address proof is required';

    if (Object.keys(newErrors).length === 0) {
      onNext(newErrors);
    } else {
      onNext(newErrors);
    }
  };

  const FileUploadCard = ({ title, description, field, accept, required = true }) => {
    const file = uploadedFiles[field];
    const hasError = errors[field];

    return (
      <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
        hasError ? 'border-error bg-error-50' : file ? 'border-success bg-success-50' : 'border-border hover:border-primary'
      }`}>
        <div className="text-center">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
            file ? 'bg-success text-success-foreground' : 'bg-secondary-100 text-text-muted'
          }`}>
            <Icon name={file ? 'CheckCircle' : 'Upload'} size={24} />
          </div>
          
          <h3 className="text-sm font-medium text-text-primary mb-1">
            {title} {required && '*'}
          </h3>
          <p className="text-xs text-text-secondary mb-4">{description}</p>
          
          {file ? (
            <div className="space-y-2">
              <p className="text-sm text-success font-medium">{file.name}</p>
              <div className="flex justify-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleFileUpload(field, null)}
                  iconName="Trash2"
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Input
                type="file"
                accept={accept}
                onChange={(e) => handleFileUpload(field, e.target.files[0])}
                className="hidden"
                id={`file-${field}`}
              />
              <label
                htmlFor={`file-${field}`}
                className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Choose File
              </label>
            </div>
          )}
          
          {hasError && (
            <p className="text-error text-xs mt-2">{errors[field]}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-accent-800 mb-1">Document Requirements</h3>
            <ul className="text-xs text-accent-700 space-y-1">
              <li>• All documents must be clear and readable</li>
              <li>• Accepted formats: PDF, JPG, PNG (Max 5MB each)</li>
              <li>• Documents will be verified within 24-48 hours</li>
              <li>• Ensure all details match your registration information</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploadCard
          title="GST Certificate"
          description="Upload your GST registration certificate"
          field="gstCertificate"
          accept=".pdf,.jpg,.jpeg,.png"
        />
        
        <FileUploadCard
          title="Business License"
          description="Upload your business/trade license"
          field="businessLicense"
          accept=".pdf,.jpg,.jpeg,.png"
        />
        
        <FileUploadCard
          title="PAN Card"
          description="Upload company PAN card"
          field="panCard"
          accept=".pdf,.jpg,.jpeg,.png"
        />
        
        <FileUploadCard
          title="Address Proof"
          description="Upload business address proof"
          field="addressProof"
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>

      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-secondary-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-1">Data Security</h3>
            <p className="text-xs text-text-secondary">
              All uploaded documents are encrypted and stored securely. We comply with Indian data protection regulations and will only use these documents for verification purposes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        <Button
          type="submit"
          variant="primary"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default VerificationDocumentsForm;