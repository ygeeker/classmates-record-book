import { PROVINCE_POST_CODE_LIST } from '../../constants/province-post-code-list';
import { StudentData } from '../../pages/map';
import { Collapse } from 'antd';

const InfoPanel: React.FC<{ students: StudentData[] }> = ({ students }) => {
  return (
    <Collapse>
      {PROVINCE_POST_CODE_LIST.map(({ code, province }) => (
        <Collapse.Panel header={province} key={code}>
          {students
            .filter(({ provincePostCode }) => provincePostCode === code)
            .map(
              (student) =>
                `${student.class}班 ${student.name} ${student.school}`,
            )}
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default InfoPanel;
