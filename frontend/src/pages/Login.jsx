import { useSearchParams } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const { googleLogin, githubLogin } = useAuth();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth_failed':
        return 'Authentication failed. Please try again.';
      case 'server_error':
        return 'Server error. Please try again later.';
      case 'session_error':
        return 'Session error. Please try again.';
      default:
        return null;
    }
  };

  const errorMessage = error ? getErrorMessage(error) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="mt-2">
              Sign in to access your dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
              {errorMessage}
            </div>
          )}
          
          <Button
            onClick={googleLogin}
            className="w-full h-12 text-base"
            size="lg"
            variant="outline"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          
          <Button
            onClick={githubLogin}
            className="w-full h-12 text-base bg-gray-900 hover:bg-gray-800"
            size="lg"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
