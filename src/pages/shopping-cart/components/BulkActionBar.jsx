import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BulkActionBar = ({ 
  selectedItems, 
  onSelectAll, 
  onDeselectAll, 
  onBulkRemove, 
  onBulkSaveForLater,
  onCreateTemplate,
  totalItems 
}) => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleCreateTemplate = () => {
    if (templateName.trim()) {
      onCreateTemplate(templateName.trim());
      setTemplateName('');
      setShowTemplateModal(false);
    }
  };

  const isAllSelected = selectedItems.length === totalItems && totalItems > 0;
  const hasSelection = selectedItems.length > 0;

  return (
    <>
      <div className="bg-surface border border-border rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Selection Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={isAllSelected ? onDeselectAll : onSelectAll}
                iconName={isAllSelected ? "Square" : "CheckSquare"}
                iconPosition="left"
              >
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </Button>
              
              {hasSelection && (
                <span className="text-sm text-text-secondary">
                  {selectedItems.length} of {totalItems} items selected
                </span>
              )}
            </div>
          </div>

          {/* Bulk Actions */}
          {hasSelection && (
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplateModal(true)}
                iconName="FileText"
                iconPosition="left"
              >
                Create Template
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkSaveForLater}
                iconName="Heart"
                iconPosition="left"
              >
                Save Selected
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkRemove}
                iconName="Trash2"
                iconPosition="left"
                className="text-error hover:text-error hover:bg-error-50"
              >
                Remove Selected
              </Button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border-light">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear Cart
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export List
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            iconPosition="left"
          >
            Share Cart
          </Button>
        </div>
      </div>

      {/* Template Creation Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Create Order Template
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTemplateModal(false)}
                iconName="X"
              />
            </div>
            
            <p className="text-sm text-text-secondary mb-4">
              Save your current selection as a template for quick reordering in the future.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Template Name
              </label>
              <Input
                type="text"
                placeholder="e.g., Monthly Restaurant Order"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={handleCreateTemplate}
                disabled={!templateName.trim()}
                iconName="Save"
                iconPosition="left"
                className="flex-1"
              >
                Create Template
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTemplateModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionBar;