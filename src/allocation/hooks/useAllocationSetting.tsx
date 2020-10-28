/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getAllocationChartSetting } from 'api/request.api';

const useAllocationSetting = () => {
  const [settingData, setSettingData] = useState({
    loading: false,
    settings: null,
    error: null,
  });

  useEffect(() => {
    const getChartSetting = async () => {
      setSettingData({ ...settingData, loading: true });
      const { data, error } = await getAllocationChartSetting();
      setSettingData({ ...settingData, loading: false });
      if (error) {
        return setSettingData({ ...settingData, error });
      }

      return setSettingData({ ...settingData, settings: data });
    };

    getChartSetting();
  }, []);

  return { loading: settingData.loading, settings: settingData.settings, error: settingData.error };
};

export default useAllocationSetting;
