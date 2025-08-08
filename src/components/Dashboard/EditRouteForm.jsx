import React from 'react';

const EditRouteForm = ({
  editForm,
  setEditForm,
  onSave,
  onCancel,
  isLoading,
  station,
}) => {
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Basic Route Info */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            من محطة
          </label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.fromName}
            onChange={e =>
              setEditForm(f => ({
                ...f,
                fromName: e.target.value,
              }))
            }
            placeholder="اسم المحطة البداية"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            إلى محطة
          </label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.toName}
            onChange={e =>
              setEditForm(f => ({
                ...f,
                toName: e.target.value,
              }))
            }
            placeholder="اسم المحطة النهائية"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            المسافة (كم)
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.distance}
            onChange={e =>
              setEditForm(f => ({
                ...f,
                distance: e.target.value,
              }))
            }
            placeholder="المسافة"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            المدة (دقيقة)
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.duration}
            onChange={e =>
              setEditForm(f => ({
                ...f,
                duration: e.target.value,
              }))
            }
            placeholder="المدة"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            التقييم
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.rating}
            onChange={e =>
              setEditForm(f => ({
                ...f,
                rating: e.target.value,
              }))
            }
            placeholder="التقييم"
          />
        </div>

        {/* Coordinates Section */}
        <div className="col-span-full">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            إحداثيات المسار
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                إحداثيات البداية
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="any"
                  className="border rounded px-2 py-1 text-xs"
                  value={editForm.startLatitude}
                  onChange={e =>
                    setEditForm(f => ({
                      ...f,
                      startLatitude: e.target.value,
                    }))
                  }
                  placeholder="خط العرض"
                />
                <input
                  type="number"
                  step="any"
                  className="border rounded px-2 py-1 text-xs"
                  value={editForm.startLongitude}
                  onChange={e =>
                    setEditForm(f => ({
                      ...f,
                      startLongitude: e.target.value,
                    }))
                  }
                  placeholder="خط الطول"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                إحداثيات النهاية
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="any"
                  className="border rounded px-2 py-1 text-xs"
                  value={editForm.endLatitude}
                  onChange={e =>
                    setEditForm(f => ({
                      ...f,
                      endLatitude: e.target.value,
                    }))
                  }
                  placeholder="خط العرض"
                />
                <input
                  type="number"
                  step="any"
                  className="border rounded px-2 py-1 text-xs"
                  value={editForm.endLongitude}
                  onChange={e =>
                    setEditForm(f => ({
                      ...f,
                      endLongitude: e.target.value,
                    }))
                  }
                  placeholder="خط الطول"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onSave(station)}
          disabled={isLoading}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60 text-sm font-medium"
        >
          {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 text-sm font-medium"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};

export default EditRouteForm;
