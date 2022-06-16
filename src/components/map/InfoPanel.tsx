import { PROVINCE_POST_CODE_LIST } from '../../constants/province-post-code-list';
import { StudentData } from '../../pages/map';
import { Collapse } from 'antd';

const InfoPanel: React.FC<{ students: StudentData[] }> = ({ students }) => {
  return (
    <Collapse>
      {PROVINCE_POST_CODE_LIST.filter(({ code }) =>
        students.map(({ provincePostCode }) => provincePostCode).includes(code),
      ).map(({ code, province }) => {
        const filteredStudents = students.filter(
          ({ provincePostCode }) => provincePostCode === code,
        );

        return (
          <Collapse.Panel
            header={`${province} ${filteredStudents.length}人`}
            key={code}
          >
            {filteredStudents.map((student) => (
              <div key={student.id}>
                {`${student.class}班 ${student.name} ${student.school}`}
              </div>
            ))}
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
};

export default InfoPanel;
