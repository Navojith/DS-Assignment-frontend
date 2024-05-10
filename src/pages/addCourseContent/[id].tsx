import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomSelect from '../../components/CourseContent/CustomSelect';
import PageContainer from '../../components/PageContainer/PageContainer';
import storage from '../../firebaseConfig';
import { getCourse } from '../../services/courseManagementService';
import { CourseDTO } from '../../types/courseTypes';

const Index = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState<CourseDTO | null>(null);

  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<string | null>(
    null
  );

  const [file, setFile] = useState<File | undefined>(undefined);
  const [percent, setPercent] = useState(0);

  const chapterOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const contentTypeOptions = ['Text', 'Video', 'Image'];

  const handleUpload = useCallback(() => {
    console.log('file', file);
    if (!file) {
      return;
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  }, [file]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFile(event.target.files?.[0]);
  };

  useEffect(() => {
    handleUpload();
  }, [file, handleUpload]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCourse(id);
      if (response) {
        setCourseData(response);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <PageContainer>
      <div className="h-[80vh] justify-center place-content-center text-center">
        <div className="text-2xl font-bold">
          Course Content of {courseData?.name}
        </div>
        <div className="flex gap-10 justify-center">
          <CustomSelect
            prompt="Select Chapter"
            options={chapterOptions}
            setSelected={setSelectedChapter}
            sequential={true}
          />
          <CustomSelect
            prompt="Select Content Type"
            options={contentTypeOptions}
            setSelected={setSelectedContentType}
          />
        </div>
        <div className="h-2/3 w-full flex items-center justify-center">
          {percent > 0 && percent < 100 ? (
            <div
              className="radial-progress text-primary"
              style={{ '--value': percent } as React.CSSProperties}
              role="progressbar"
            >
              {percent}%
            </div>
          ) : (
            <input
              type="file"
              className="file-input file-input-bordered file-input-secondary text-slate-700 w-full max-w-xs"
              onChange={handleFileChange}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
