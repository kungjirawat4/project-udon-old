import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage
            src="https://material-kit-pro-react.devias.io/assets/avatar-5.png"
            alt="Avatar"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">เวลา  08:00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex size-9 items-center justify-center space-y-0 border">
          <AvatarImage
            src="https://material-kit-pro-react.devias.io/assets/avatar-3.png"
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium">เวลา  08:00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage
            src="https://material-kit-pro-react.devias.io/assets/avatar-4.png"
            alt="Avatar"
          />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">เวลา  08:00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage
            src="https://material-kit-pro-react.devias.io/assets/avatar-5.png"
            alt="Avatar"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">เวลา  08:00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex size-9 items-center justify-center space-y-0 border">
          <AvatarImage
            src="https://material-kit-pro-react.devias.io/assets/avatar-3.png"
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium">เวลา  08:00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage
            src="https://material-kit-pro-react.devias.io/assets/avatar-4.png"
            alt="Avatar"
          />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">เวลา  08:00</div>
      </div>
    </div>
  );
}
